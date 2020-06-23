import { BrowserModule } from "@angular/platform-browser";
import { NgModule, OnInit, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  schemas: [
    NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
