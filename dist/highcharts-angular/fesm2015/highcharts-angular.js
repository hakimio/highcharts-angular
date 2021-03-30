import { EventEmitter, Component, ElementRef, NgZone, Input, Output, NgModule } from '@angular/core';

class HighchartsChartComponent {
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

class HighchartsChartModule {
}
HighchartsChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [HighchartsChartComponent],
                exports: [HighchartsChartComponent]
            },] }
];

/*
 * Public API Surface of highcharts-angular
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HighchartsChartComponent, HighchartsChartModule };
//# sourceMappingURL=highcharts-angular.js.map
