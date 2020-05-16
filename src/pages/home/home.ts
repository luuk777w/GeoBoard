import { Page } from "../page";
import { Sidebar } from "./sidebar/sidebar";
import { Board } from "./board/board";
import { BoardHub } from "../../js/hubs/BoardHub";
import { Helpers } from "../../js/helpers";
import { BoardViewModel } from "../../js/models/BoardViewModel";
import * as $ from 'jquery';

export class HomePage extends Page {

    private sidebar: Sidebar;
    private board: Board;

    private boardHub: BoardHub;

    constructor() {
        super();

        this.sidebar = new Sidebar();
        this.board = Board.getInstance();

        this.boardHub = BoardHub.getInstance();

        this.template.setLayout("base_layout");

        // Register the click events.
        Helpers.registerOnClick("logout", () => this.logout());
        Helpers.registerOnClick("theme", () => this.toggleTheme());

        // Load the board information from the server if available.
        this.board.loadBoard().then((board: BoardViewModel) => {
            this.template.loadHtml("home", { currentBoard: board.name });
            this.template.setPageTitle(board.name);

            // Show the board info in the navigation section.
            $('.board-info').show();

            this.board.show(board.id);

            // Board selected; return true for usage later in this chain.
            return true;
        })
            .catch((error) => {
                // Load the home page without setting the board info.
                this.template.loadHtml("home");

                // Show the "Select a board instruction" by setting the board to null.
                this.board.show(null);

                // Hide the board info.
                $('.board-info').hide();

                // No baord selected; return false for usage later in this chain.
                return false;
            })
            .then(async (boardSelected: boolean) => {
                // Load the sidebar when everything is finished.
                // The sidebar must wait on the loadHTML to finish.
                await this.sidebar.loadSidebar();

                this.loadTheme();

                // Toggle the sidebar when there is no board selected.
                if (!boardSelected) {
                    this.sidebar.toggle();
                }
            });

        // Listen to the on SwitchedBoard event.
        this.boardHub.getConnection().on('SwitchedBoard', (response: BoardViewModel) => {
            this.template.setPageTitle(response.name);
            $('.board-info-name').text(response.name);
            $('.board-info').show();

            // Show the current board with the board ID from the response.
            this.board.show(response.id);
        });

        this.boardHub.getConnection().on('UserJoinedBoard', (response) => {
            this.updateUserList(response.joinedUsers);
        });

        this.boardHub.getConnection().on('UserLeftBoard', (response) => {
            this.removeLeftUser(response.userId);
        });

        // TODO: Call autosize when the 'new element' panel is shown
        $('textarea').each(function () {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

    }

    /**
     * Append the given user to the list of users who are viewing the current board.
     *
     * @param userId The ID of the user who joined the board.
     * @param username The username of the user who joined the board.
     */
    public showJoinedUser(userId: string, username: string) {
        let template = `
        <li class="avatar animated bounceIn" title="${username}" data-user="${userId}">
            <span class="avatar-title">${username[0].toUpperCase()}</span>
        </li>`;

        $('.active-board-users').append(template);
    }

    /**
     * Update the list of users who are viewing the board currently.
     *
     * @param users The list of users who are viewing the current board.
     */
    public updateUserList(users: any)
    {
        this.clearUserList();

        $.each(users, (index, user) => {
            // Ignore the current logged in user.
            if (user.id == this.JWT.getId()) return;

            // Show the user in the list.
            this.showJoinedUser(user.id, user.username);
        });
    }

    /**
     * Remove the given user from the list of users who are viewing the current board.
     *
     * @param userId The ID of the user who left the board.
     */
    public removeLeftUser(userId: string) {
        $(`.active-board-users .avatar[data-user="${userId}"]`).remove();
    }

    /**
     * Clear the list of users who are viewing the current board.
     */
    public clearUserList() {
        $(`.active-board-users .avatar`).remove();
    }

    public toggleTheme() {
        let currentTheme = localStorage.getItem('theme') ?? 'light';

        if (currentTheme == 'light')
            currentTheme = 'dark';
        else
            currentTheme = 'light';

        localStorage.setItem('theme', currentTheme);

        this.loadTheme();
    }

    public loadTheme() {
        const currentTheme = localStorage.getItem('theme') ?? 'light';
        const view = $('.home-view');

        if (currentTheme == 'dark') {
            view.addClass('dark-theme');
            $('.logo-dark').hide();
            $('.logo-light').show();

            $('[data-target="theme"]').html(`<i class="far fa-sun fa-lg fa-fw"></i>`);
        }
        else {
            view.removeClass('dark-theme');
            $('.logo-light').hide();
            $('.logo-dark').show();
            $('[data-target="theme"]').html(`<i class="fas fa-moon fa-lg fa-fw"></i>`);
        }
    }

    public logout() {
        // Disconnect from the SignalR socket.
        this.boardHub.getConnection().stop();

        // Forget the login token.
        this.JWT.clear();

        this.router.redirect("/login");
    }
}

