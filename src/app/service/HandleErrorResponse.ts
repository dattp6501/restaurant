import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router"

@Injectable({ providedIn: 'root' })
export class HandleErrorResponse{
    constructor(private router: Router){

    }
    handle(data: any){
        if(data.status == 401){
        }else if(data.status == 403){
        }else{
            
        }
    }

    checkaccessToken(accessToken: any){
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if(accessToken==null || accessToken==undefined){
                    if(event.url.includes('login') || event.url.includes('register') 
                        || event.url.includes('dish') || event.url.includes('table')) return;
                    else  this.router.navigate(['/login'], {});
                }
            }
          });
    }
}