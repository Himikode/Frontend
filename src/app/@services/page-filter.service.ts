import { Injectable } from '@angular/core';
import { tap } from  'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

 
@Injectable({
	providedIn: 'root'
})


export class PageFilterService {
 
	currentFilter = new BehaviorSubject(null);
	lastUpdate = new BehaviorSubject(null);
	constructor()  {}


    
	setFilter = function(filter) {
		this.currentFilter.next(filter);
	}

	clear = function() {
		this.currentFilter.next(null);
	}

	setLastUpdate = function(time) {
		this.lastUpdate.next(time);
	}


}