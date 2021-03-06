import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { WorkspaceService} from "./shared/services/workspace.service"
import { Workspace } from "./shared/classes/workspace"

@Component({
    selector: "SearchW",
    moduleId: module.id,
    templateUrl: "./search_workspace.component.html",
    styleUrls: ["./search_workspace.component.css"],
    providers: [WorkspaceService]
    
    
})
export class SearchWorkspaceComponent implements OnInit {
    
    public myItems: Array<Workspace>;
    constructor(private w_service: WorkspaceService){
        this.w_service.getWorkspaces()    
        .subscribe((data) => {
            console.log("Kolo tmm  !!!");
            console.log("Error  shit happen !!");
            data.Result.forEach((workspace) => {
                this.myItems.push( new Workspace(workspace.id,workspace.name) ); 
            });
        }, (error) => {
            console.log("shit happen !");
            this.myItems = [ new Workspace(1,"Ebda3"),new Workspace(2,"El madrsa") ];
            return this.myItems;
        });
    }
    openWorkspacePage(){
        console.log("Hello");
    }
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
