import React, { FormEvent } from 'react';
import { AuthLayout } from '../../layouts/auth/auth';
import { Link } from 'react-router-dom';

import './login.scss';
import { container } from 'tsyringe';
import { AuthorizeService } from '../../services/authorize';

export class Login extends React.Component<{}, LoginState> {

    private authorizeService: AuthorizeService;

    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false
        }

        this.authorizeService = container.resolve(AuthorizeService);
    }

    async onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        /**
         * @Luuk
         *
         * De precieze wijze waarop we het beste forms kunnen submitten moet nog uitgezocht worden.
         * Je kunt het namelijk 'controlled' en niet 'controlled' doen. Wat nou precies het verschil is weet ik nog niet, maar met de staat zoals het hieronder nu staat, werkt het nog niet.
         * Dat komt omdat React het nu nog als readonly ziet doordat er geen onChange is. Als we dat even kunnen vermijden: graag. Maar aan de andere kant moeten we ook nog front-end validatie toepassen.
         *
         * Misschien was het je al opgevallen dat ik een begin gemaakt heb met de HttpService en de AuthorizeService. Ik heb het nog niet kunnen testen, dus kijk maar wat je ermee doet.
         * Voor nu heb ik gewoon de structuur van de 'oude' versie overgenomen en meegenomen in de structuur zoals we die nu toepassen.
         *
         * Belangrijk: pull even de API. Doordat we nu met port 8888 werken, accepteerde de CORS deze applicatie niet. Na het pullen wel ;-)
         *
         * Tot slot wordt de JSON nog niet goed doorgeven naar de API. De payload is nu nog `username=iets&password=geheim&rememberMe=false`.
         */

        await this.authorizeService.login(this.state.username, this.state.password, this.state.rememberMe)
            .then((response) => {
                console.log(response);
            })
            .catch((e) => console.log(e))
            .finally(() => {
                /**
                 * @Luuk
                 *
                 * FINALLY A finally BLOCK :D
                 * Kan best handig zijn als je in beide gevallen (then of catch) hetzelfde moet doen.
                 */
            });
    }

    render() {
        return (
            <AuthLayout>
                <div className="login-container animated fadeInDown">
                    {/* ALERT HERE */}

                    <div className="panel">
                        <div className="panel-header">Login to GeoBoard</div>

                        <form method="post" id="loginForm" onSubmit={(event) => this.onSubmit(event)}>
                            <div className="panel-body">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-user"></i>
                                        </div>
                                        <input type="text" value={this.state.username} id="username" name="username" placeholder="Username" autoFocus />
                                    </div>
                                    <div className="validation-error" data-field="username"></div>
                                </div>

                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-prefix">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                        <input type="password" value={this.state.password} id="password" name="password" placeholder="Password" />
                                    </div>
                                    <div className="validation-error" data-field="password"></div>
                                </div>

                                <div className="remember checkbox">
                                    <input id="remember" type="checkbox" name="remember" checked={this.state.rememberMe} />
                                    <label htmlFor="remember">Remember me</label>
                                </div>

                                <div className="validation-error"></div>
                            </div>

                            <div className="panel-footer">
                                <div className="button-group">
                                    <button type="submit" className="button button-green button-pd-2">Login</button>
                                    <button className="button button-link button-pd-2" data-target="recover-password">Reset password</button>
                                </div>

                                <p className="register-information pt-1">No account yet? <Link to="/register">Create one here</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthLayout>
        )
    }

}

interface LoginState {
    username: string;
    password: string;
    rememberMe: boolean;
}
