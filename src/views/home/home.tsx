import React from 'react';
import Board from 'components/board/board';
import BaseContainer from 'containers/base/base';
import { HttpService } from 'services/http.service';

import './home.scss';
import { container } from 'tsyringe';
import { BoardElementMutateModel } from 'models/BoardElementMutateModel';
import { AppState } from 'store';
import { connect } from 'react-redux';
import { BoardElementState } from 'store/boardElement/types';
import { setTempImageBlob } from 'store/boardElement/actions';

interface HomeProps {
    history: any;
    boardElementState: BoardElementState;
    setTempImageBlob: typeof setTempImageBlob;
}

class Home extends React.Component<HomeProps> {

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

                if (this.props.boardElementState.tempImageBlob != "") {

                    return;
                }

                hasFile = true;
                let blob = item.getAsFile();
                let reader = new FileReader();

                reader.onload = function (event: any) {

                    home.props.setTempImageBlob(event.target.result.split("base64,")[1]);

                    home.httpService.postWithAuthorization<BoardElementMutateModel>(`/boards/elements/`, JSON.stringify({ Image: '' })).then(() => {
                        console.log("success!");
                    }, (e) => {
                        console.log(e);
                    });
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

const mapStateToProps = (state: AppState) => ({
    boardElementState: state.boardElement
});

export default connect(mapStateToProps, { setTempImageBlob })(Home);
