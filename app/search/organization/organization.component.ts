import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Organization } from "../shared/classes/organization";
import { Workshop } from "../shared/classes/workshop";
import { Review  } from "../shared/classes/review"
import { getNumber, setString } from "tns-core-modules/application-settings/application-settings";



@Component({
    moduleId: module.id,
    templateUrl: "./organization.component.html",
    styleUrls: ["./organization.component.css"],
    providers: [SearchService]
})

export class OrganizationComponent implements OnInit {

    public search_service: SearchService;
    public organiztion_id: number;

    public workshops: Array<Workshop>;

    public reviews : Array<Review>;

    public organization: Organization;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    public feedback: string;
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/

    post_review_for_org(){
        this.search_service.post_review_for_org(this.organiztion_id,this.feedback)
        .subscribe((res) => {
            let data = res;
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            console.log(JSON.stringify(res) );
            console.log("reveiw granted")
        }, (error) => {
            let data = error;
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            console.log(" Network Went Down ")
            console.log(error)
        });
    }
    ngOnInit(): void {
        console.log("ngInit started, the id =");

        this.organiztion_id = getNumber("current_o",this.route.snapshot.params["id"])

        console.log(this.organiztion_id);

        this.search_service.getOrganizationInfo(this.organiztion_id)
            .subscribe((res) => {

                console.log(JSON.stringify(res.json()));

                console.log('got workspace info');

                console.log(res.json().name);
                console.log(res.json().about);

                this.organization = new Organization(res.json().id, res.json().name, res.json().university, res.json().description, res.json().logo);

                this.organization.email = res.json().email;
                this.organization.phone = res.json().phone;

                console.log(this.organization.imagelink);


            }, (error) => {
                console.log(" Network Went Down ")
            });

            
        this.search_service.getWokshops(this.organiztion_id)
            .subscribe((res) => {

                this.workshops = [];

                res["_body"].forEach((workshop) => {
                    console.log("in loop")
                    console.log(JSON.stringify(workshop));
                    this.workshops.push(new Workshop(workshop.id, workshop.title, workshop.description, workshop.date, workshop.time));
                    console.log(workshop.title);
                    console.log(workshop.description);
                });

            }, (error) => {
                console.log(" Network Went Down ")
            });

        this.search_service.get_reviews_for_org(this.organiztion_id)
        .subscribe((res) => {
            this.reviews=[];
            console.log(JSON.stringify(res))
            console.log("<<<------------------------Reviews In Search -------------------------->>>")
            res["_body"].forEach((review) => {
                console.log("in loop")
                console.log(JSON.stringify(review));
                this.reviews.push(new Review(review.feedback,review.rating,review.name,review.image))
                
                //this.workshops.push(new Workshop(workshop.id, workshop.title, workshop.description, workshop.date, workshop.time));
            });
            console.log("<<<------------------------Reviews In Search -------------------------->>>")            

        }, (error) => {
            console.log(" Network Went Down ")
        });


        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService, private route: ActivatedRoute) {
        this.search_service = ss;
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