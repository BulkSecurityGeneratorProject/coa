import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleAccount } from 'app/shared/model/vehicle-account.model';
import { VehicleAccountService } from './vehicle-account.service';

@Component({
    selector: 'jhi-vehicle-account-delete-dialog',
    templateUrl: './vehicle-account-delete-dialog.component.html'
})
export class VehicleAccountDeleteDialogComponent {
    vehicleAccount: IVehicleAccount;

    constructor(
        protected vehicleAccountService: VehicleAccountService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleAccountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vehicleAccountListModification',
                content: 'Deleted an vehicleAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-account-delete-popup',
    template: ''
})
export class VehicleAccountDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vehicleAccount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VehicleAccountDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vehicleAccount = vehicleAccount;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/vehicle-account', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/vehicle-account', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
