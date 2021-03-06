import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoaSharedModule } from 'app/shared';
import {
    UserAccountComponent,
    UserAccountDetailComponent,
    UserAccountUpdateComponent,
    UserAccountDeletePopupComponent,
    UserAccountDeleteDialogComponent,
    userAccountRoute,
    userAccountPopupRoute
} from './';

const ENTITY_STATES = [...userAccountRoute, ...userAccountPopupRoute];

@NgModule({
    imports: [CoaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserAccountComponent,
        UserAccountDetailComponent,
        UserAccountUpdateComponent,
        UserAccountDeleteDialogComponent,
        UserAccountDeletePopupComponent
    ],
    entryComponents: [UserAccountComponent, UserAccountUpdateComponent, UserAccountDeleteDialogComponent, UserAccountDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoaUserAccountModule {}
