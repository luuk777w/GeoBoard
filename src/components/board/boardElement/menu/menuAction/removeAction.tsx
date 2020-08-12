import { HttpService } from 'services/http.service';
import { container } from 'tsyringe';

export function removeAction(elementId: string) {

    const httpService = container.resolve(HttpService);

    httpService.deleteWithAuthorization(`/boards/elements/${elementId}`).then(() => {

    }, (error) => {
        console.warn(error);
    });
}
