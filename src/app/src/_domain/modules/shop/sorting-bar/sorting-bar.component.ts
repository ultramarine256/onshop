import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-sorting-bar',
    styleUrls: ['./sorting-bar.component.scss'],
    templateUrl: './sorting-bar.component.html'
})
export class SortingBarComponent {
    @Input() set setCurrentFilter(value) {
        this.selectedFilter = value;
    }

    @Output() sortTypeChanged = new EventEmitter<SortItem>();
    public sortItemsArray: SortItem[] = [];
    public selectedFilter: string;

    constructor() {
        this.sortItemsArray = [
            {
                name: 'all',
                property: 'all',
                title: 'All',
                visible: true
            },
            {
                name: 'price',
                property: 'desc',
                title: 'price desc',
                visible: true
            },
            {
                name: 'price',
                property: 'asc',
                title: 'price asc',
                visible: true
            },
            {
                name: 'date',
                property: 'desc',
                title: 'date desc',
                visible: true
            },
            {
                name: 'date',
                property: 'asc',
                title: 'date asc',
                visible: true
            },
            {
                name: 'rent',
                property: 'asc',
                title: 'rent price asc',
                visible: false
            },
            {
                name: 'rent',
                property: 'asc',
                title: 'rent price asc',
                visible: false
            }];
    }

    public change(value) {
        this.sortItemsArray.forEach(x => {
            if (x.title === value) {
                return this.sortTypeChanged.emit(x);
            }
        });
    }
}

export class SortItem {
    name: string;
    property: string;
    title: string;
    visible: boolean;

    constructor(name: string, property: string, title: string, visible: boolean) {
        this.name = name;
        this.property = property;
        this.title = title;
        this.visible = visible;
    }
}
