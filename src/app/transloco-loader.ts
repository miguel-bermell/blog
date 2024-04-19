import { inject, Injectable } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
    private http = inject(HttpClient);

    getTranslation(lang: string) {
        const path = environment.production ? `./i18n/${lang}.json` : `${environment.baseUrl}/i18n/${lang}.json`
        return this.http.get<Translation>(path);
    }
}
