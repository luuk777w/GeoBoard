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

class Home extends React.Component<HomeProps, any> {

    private httpService: HttpService;

    constructor(props: any) {
        super(props);

        this.httpService = container.resolve(HttpService);

        this.state = {
            version: "0"
        }
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

    componentWillMount() {
        this.httpService.get("/").then((response: any) => {
            this.setState({
                version: JSON.parse(response).version
            })
        }, error => {
            console.error(error);
        })
    }

    render() {
        return (
            <div onPaste={() => this.onPaste(event)} style={{ height: "100%" }}>
                <BaseContainer history={this.props.history}>
                    <div className="board-container" >
                        <Board />
                    </div>

                    <code className="version">{this.state.version} - Made with ❤️ by LuxMatter</code>
                </BaseContainer>
            </div>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    boardElementState: state.boardElement
});

export default connect(mapStateToProps, { setTempImageBlob })(Home);
