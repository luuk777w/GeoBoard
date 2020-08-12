import { HttpService } from 'services/http.service';
import { container } from 'tsyringe';

export function removeElement(elementId: string) {

    const httpService = container.resolve(HttpService);

    httpService.deleteWithAuthorization(`/boards/elements/${elementId}`).then(() => {

    }, (error) => {
        console.warn(error);
    });
}
