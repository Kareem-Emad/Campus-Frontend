import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ManageRoutingModule } from "./manage-routing.module";
import { ManageComponent } from "./manage.component";

import { NativeScriptHttpModule } from "nativescript-angular/http";


@NgModule({
    imports: [
        NativeScriptModule,
        ManageRoutingModule,
        SharedModule,
        NativeScriptHttpModule
    ],
    declarations: [
        ManageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ManageModule { }
