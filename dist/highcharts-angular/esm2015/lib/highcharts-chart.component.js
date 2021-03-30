import { Component, ElementRef, EventEmitter, Input, Output, NgZone } from '@angular/core';
export class HighchartsChartComponent {
    constructor(el, _zone // #75
    ) {
        this.el = el;
        this._zone = _zone;
        this.updateChange = new EventEmitter(true);
        this.chartInstance = new EventEmitter(); // #26
    }
    ngOnChanges(changes) {
        const update = changes.update && changes.update.currentValue;
        if (changes.options || update) {
            this.wrappedUpdateOrCreateChart();
            if (update) {
                this.updateChange.emit(false); // clear the flag after update
            }
        }
    }
    wrappedUpdateOrCreateChart() {
        if (this.runOutsideAngular) {
            this._zone.runOutsideAngular(() => {
                this.updateOrCreateChart();
            });
        }
        else {
            this.updateOrCreateChart();
        }
    }
    updateOrCreateChart() {
        if (this.chart && this.chart.update) {
            this.chart.update(this.options, true, this.oneToOne || false);
        }
        else {
            this.chart = this.Highcharts[this.constructorType || 'chart'](this.el.nativeElement, this.options, this.callbackFunction || null);
            // emit chart instance on init
            this.chartInstance.emit(this.chart);
        }
    }
    ngOnDestroy() {
        if (this.chart) { // #56
            this.chart.destroy();
            this.chart = null;
        }
    }
}
HighchartsChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'highcharts-chart',
                template: ''
            },] }
];
HighchartsChartComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
HighchartsChartComponent.propDecorators = {
    Highcharts: [{ type: Input }],
    constructorType: [{ type: Input }],
    callbackFunction: [{ type: Input }],
    oneToOne: [{ type: Input }],
    runOutsideAngular: [{ type: Input }],
    options: [{ type: Input }],
    update: [{ type: Input }],
    updateChange: [{ type: Output }],
    chartInstance: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGNoYXJ0cy1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9oaWdoY2hhcnRzLWFuZ3VsYXIvc3JjL2xpYi9oaWdoY2hhcnRzLWNoYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBT2hJLE1BQU0sT0FBTyx3QkFBd0I7SUFjbkMsWUFDVSxFQUFjLEVBQ2QsS0FBYSxDQUFDLE1BQU07O1FBRHBCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUGIsaUJBQVksR0FBRyxJQUFJLFlBQVksQ0FBVSxJQUFJLENBQUMsQ0FBQztRQUMvQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDLENBQUMsTUFBTTtJQU9uRSxDQUFDO0lBRUosV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDN0QsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztZQUNsQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjthQUM5RDtTQUNGO0lBQ0gsQ0FBQztJQUVELDBCQUEwQjtRQUN4QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxVQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksT0FBTyxDQUFDLENBQ3BFLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUNyQixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQzlCLENBQUM7WUFFRiw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRyxNQUFNO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDbkI7SUFDSCxDQUFDOzs7WUEvREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFFBQVEsRUFBRSxFQUFFO2FBQ2I7OztZQU5tQixVQUFVO1lBQTBDLE1BQU07Ozt5QkFRM0UsS0FBSzs4QkFDTCxLQUFLOytCQUNMLEtBQUs7dUJBQ0wsS0FBSztnQ0FDTCxLQUFLO3NCQUNMLEtBQUs7cUJBQ0wsS0FBSzsyQkFFTCxNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBOZ1pvbmUsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgdHlwZSAqIGFzIEhpZ2hjaGFydHMgZnJvbSAnaGlnaGNoYXJ0cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2hpZ2hjaGFydHMtY2hhcnQnLFxyXG4gIHRlbXBsYXRlOiAnJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSGlnaGNoYXJ0c0NoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIEhpZ2hjaGFydHM6IHR5cGVvZiBIaWdoY2hhcnRzO1xyXG4gIEBJbnB1dCgpIGNvbnN0cnVjdG9yVHlwZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGNhbGxiYWNrRnVuY3Rpb246IEhpZ2hjaGFydHMuQ2hhcnRDYWxsYmFja0Z1bmN0aW9uO1xyXG4gIEBJbnB1dCgpIG9uZVRvT25lOiBib29sZWFuOyAvLyAjMjBcclxuICBASW5wdXQoKSBydW5PdXRzaWRlQW5ndWxhcjogYm9vbGVhbjsgLy8gIzc1XHJcbiAgQElucHV0KCkgb3B0aW9uczogSGlnaGNoYXJ0cy5PcHRpb25zO1xyXG4gIEBJbnB1dCgpIHVwZGF0ZTogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIHVwZGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgQE91dHB1dCgpIGNoYXJ0SW5zdGFuY2UgPSBuZXcgRXZlbnRFbWl0dGVyPEhpZ2hjaGFydHMuQ2hhcnQ+KCk7IC8vICMyNlxyXG5cclxuICBwcml2YXRlIGNoYXJ0OiBIaWdoY2hhcnRzLkNoYXJ0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUgLy8gIzc1XHJcbiAgKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBjb25zdCB1cGRhdGUgPSBjaGFuZ2VzLnVwZGF0ZSAmJiBjaGFuZ2VzLnVwZGF0ZS5jdXJyZW50VmFsdWU7XHJcbiAgICBpZiAoY2hhbmdlcy5vcHRpb25zIHx8IHVwZGF0ZSkge1xyXG4gICAgICB0aGlzLndyYXBwZWRVcGRhdGVPckNyZWF0ZUNoYXJ0KCk7XHJcbiAgICAgIGlmICh1cGRhdGUpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYW5nZS5lbWl0KGZhbHNlKTsgLy8gY2xlYXIgdGhlIGZsYWcgYWZ0ZXIgdXBkYXRlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdyYXBwZWRVcGRhdGVPckNyZWF0ZUNoYXJ0KCkgeyAvLyAjNzVcclxuICAgIGlmICh0aGlzLnJ1bk91dHNpZGVBbmd1bGFyKSB7XHJcbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlT3JDcmVhdGVDaGFydCgpXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51cGRhdGVPckNyZWF0ZUNoYXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVPckNyZWF0ZUNoYXJ0KCkge1xyXG4gICAgaWYgKHRoaXMuY2hhcnQgJiYgdGhpcy5jaGFydC51cGRhdGUpIHtcclxuICAgICAgdGhpcy5jaGFydC51cGRhdGUodGhpcy5vcHRpb25zLCB0cnVlLCB0aGlzLm9uZVRvT25lIHx8IGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2hhcnQgPSAodGhpcy5IaWdoY2hhcnRzIGFzIGFueSlbdGhpcy5jb25zdHJ1Y3RvclR5cGUgfHwgJ2NoYXJ0J10oXHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIHRoaXMub3B0aW9ucyxcclxuICAgICAgICB0aGlzLmNhbGxiYWNrRnVuY3Rpb24gfHwgbnVsbFxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gZW1pdCBjaGFydCBpbnN0YW5jZSBvbiBpbml0XHJcbiAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZS5lbWl0KHRoaXMuY2hhcnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7IC8vICM0NFxyXG4gICAgaWYgKHRoaXMuY2hhcnQpIHsgIC8vICM1NlxyXG4gICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5jaGFydCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==