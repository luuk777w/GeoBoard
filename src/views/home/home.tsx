import React from 'react';
import Board from 'components/board/board';
import BaseContainer from 'containers/base/base';
import { HttpService } from 'services/http.service';

import './home.scss';
import { container } from 'tsyringe';
import { BoardElementMutateModel } from 'models/BoardElementMutateModel';

interface HomeProps {
    history: any;
}

export class Home extends React.Component<HomeProps> {

    private httpService: HttpService;

    constructor(props: any) {
        super(props);

        this.httpService = container.resolve(HttpService);
    }

    onPaste(event: any) {
        let home = this;
        let e = event;
        let hasFile = false;
        let items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let index in items) {
            let item = items[index];
            if (item.kind === 'file') {
                hasFile = true;
                let blob = item.getAsFile();
                let reader = new FileReader();
                reader.onload = function (event: any) {

                    let dataObject: BoardElementMutateModel = {
                        Image: event.target.result.split("base64,")[1]
                    }

                    //REPLACE \/
                    const boardId = "465c2f41-a4b9-4c0e-d7f9-08d7f126e84e";

                    home.httpService.postWithAuthorizationAndProgress<BoardElementMutateModel>(`/boards/${boardId}/createElement`, JSON.stringify(dataObject)).then(() => {
                        console.log("success!");
                    }, (e) => {
                        console.log(e);
                    });


                    console.log("Hoi");
                }
                reader.readAsDataURL(blob);
            }
        }

        if (!hasFile) {
            console.log("NOT A FILE");
        }
    }

    render() {
        return (
            <BaseContainer history={this.props.history} >
                <div className="board-container" onPaste={() => this.onPaste(event)}>
                    <Board />
                </div>
            </BaseContainer>
        )
    }

}
