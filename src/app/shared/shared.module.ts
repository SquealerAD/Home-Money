import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {LoaderComponent} from "./components/loader/loader.component";

@NgModule({

  imports: [
    ReactiveFormsModule, // ReactiveFormsModule - for reactive forms approach
    FormsModule, // FormsModule - for template forms approach
    NgxChartsModule // import for NgxChart use
  ],
  // export wanted modules if you want consumers to see them in components,modules,directives
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    LoaderComponent
  ],
  declarations: [LoaderComponent]
})

export class SharedModule {

}
