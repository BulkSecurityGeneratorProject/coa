import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IBillingTariff } from 'app/shared/model/billing-tariff.model';
import { BillingTariffService } from './billing-tariff.service';
import { IBillingLocation } from 'app/shared/model/billing-location.model';
import { BillingLocationService } from 'app/entities/billing-location';

@Component({
    selector: 'jhi-billing-tariff-update',
    templateUrl: './billing-tariff-update.component.html'
})
export class BillingTariffUpdateComponent implements OnInit {
    billingTariff: IBillingTariff;
    isSaving: boolean;

    ids: IBillingLocation[];
    startedIn: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected billingTariffService: BillingTariffService,
        protected billingLocationService: BillingLocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ billingTariff }) => {
            this.billingTariff = billingTariff;
            this.startedIn = this.billingTariff.startedIn != null ? this.billingTariff.startedIn.format(DATE_TIME_FORMAT) : null;
        });
        this.billingLocationService
            .query({ filter: 'billingtariff-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IBillingLocation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IBillingLocation[]>) => response.body)
            )
            .subscribe(
                (res: IBillingLocation[]) => {
                    if (!this.billingTariff.idId) {
                        this.ids = res;
                    } else {
                        this.billingLocationService
                            .find(this.billingTariff.idId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IBillingLocation>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IBillingLocation>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IBillingLocation) => (this.ids = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.billingTariff.startedIn = this.startedIn != null ? moment(this.startedIn, DATE_TIME_FORMAT) : null;
        if (this.billingTariff.id !== undefined) {
            this.subscribeToSaveResponse(this.billingTariffService.update(this.billingTariff));
        } else {
            this.subscribeToSaveResponse(this.billingTariffService.create(this.billingTariff));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBillingTariff>>) {
        result.subscribe((res: HttpResponse<IBillingTariff>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBillingLocationById(index: number, item: IBillingLocation) {
        return item.id;
    }
}
