import { XHR } from "../../../js/xhr";
import { BoardHub } from "../../../js/hubs/BoardHub";
import { Board } from "../board/board";
import { Alert, AlertType } from "../../../js/alert";
import { Helpers } from "../../../js/helpers";
import { BoardViewModel } from "../../../js/models/BoardViewModel";
import * as Handlebars from 'handlebars'
import * as $ from 'jquery';

export class Sidebar {

    private XHR: XHR;
    private boardHub: BoardHub;
    private board: Board;
    private alert: Alert;
    private templates: any;

    constructor() {
        this.XHR = XHR.getInstance();
        this.boardHub = BoardHub.getInstance();
        this.board = Board.getInstance();
        this.templates = require('../../../../dist/js/templates');

        this.alert = new Alert('.side-nav-body');

        Helpers.registerOnClick("sidebar", () => this.toggle());
        Helpers.registerOnClick("closeSidebar", () => this.close());

        Helpers.registerOnClick("toggleCreateBoard", () => this.toggleCreateBoard());
        Helpers.registerOnClick("createBoard", () => this.createBoard());

        // TODO: Dit moet een route worden. Heeft ook als voordeel dat je een bord direct kunt benaderen.
        Helpers.registerOnClick("board", (event: any) => this.goToBoard(event.target));

        // TODO: Moet verplaatst worden naar een betere plek (als dat nog van toepassing is).
        this.boardHub.getConnection().on('boardCreated', (response: any) => {
            console.log('From hub: ', response);
        });
    }

    /**
     * Load the data needed for the sidebar and compile / show the sidebar HTML after.
     */
    public async loadSidebar() {
        let data = {
            selectedBoard: localStorage.getItem('board'),
            myBoards: await this.loadMyBoards(),
            activeBoards: [] as string[],
            snapshots: [] as string[]
        }

        let out = Handlebars.compile(this.templates["sidebar"](data));
        $("#sidebar").html(out({}));
    }

    /**
     * Load the boards owned by the current user.
     */
    private async loadMyBoards(): Promise<Array<BoardViewModel>> {
        let boards: Array<BoardViewModel> = [];

        await this.XHR.getWithAuthorization(`/boards`).then((data) => {

            $.each(data, (index: number, data) => {
                boards.push({
                    id: data.id,
                    name: data.name,
                    userId: data.userId,
                    createdAt: data.createdAt,
                    isLocked: data.isLocked,
                    elements: [],
                });
            });

        }, error => {
            console.warn(error);
        });

        return boards;
    }

    /**
     * Go to the clicked board.
     *
     * @param target The clicked board item.
     */
    public goToBoard(target: any) {
        // The board item in the sidebar.
        let clickedBoardItem = $(target);

        const currentBoard = localStorage.getItem('board');

        // if clicked on the time or text, set clickedBoardItem to parent board-list-item
        if (clickedBoardItem.is("time") || clickedBoardItem.hasClass("board-list-item-description")) {
            clickedBoardItem = $(target).parents(".board-list-item");
        }

        const requstedBoard = clickedBoardItem.data('board-id')


        // Prevent null or duplicate switch to board.
        if (requstedBoard == null || requstedBoard == currentBoard) {
            localStorage.removeItem('board');
            $('.board-list-item.active').removeClass('active');
            this.board.show();
            return;
        }

        // Attemp to switch to the clicked board.
        this.boardHub.getConnection().invoke("SwitchBoard", currentBoard, requstedBoard)
            .then((response: BoardViewModel) => {
                //console.log(response);

                if (response == null)
                    return;

                // Store the new board id.
                localStorage.setItem('board', response.id);

                // Toggle the previous and active board.
                $('.board-list-item.active').removeClass('active');
                $(clickedBoardItem).addClass('active');

                this.alert.hide(true);

            }).catch((error: any) => {
                console.warn('Something went wrong while switching to the requested board', error);

                this.alert.show(AlertType.Error, "Something went wrong. Please try again.", true);
            });

        // When a board is not found or the user is not allowed to access the board...
        this.boardHub.getConnection().on('BoardNotFound', (response: any) => {
            console.warn('BoardNotFound', response);

            this.alert.show(AlertType.Error, "Board not found.", true);
        });
    }

    public toggleCreateBoard() {

        if ($("[data-target='toggleCreateBoard']").hasClass("button-green")) {
            $("[data-target='toggleCreateBoard']")
                .removeClass("button-green")
                .addClass("button-red")
                .html("Cancel");

            $(".side-nav-my-boards").html("Create board");

            $(".create-board-section").slideDown(100);

        } else {
            $("[data-target='toggleCreateBoard']")
                .removeClass("button-red")
                .addClass("button-green")
                .html("Create board");

            $(".side-nav-my-boards").html("My boards");

            $(".create-board-section").slideUp(100);
        }
    }

    public createBoard() {

        let boardName = $("[name=boardName]").val();

        if (boardName == "" || boardName == null) {
            this.alert.show(AlertType.Error, "Please enter a boardname", true);

            setTimeout(() => {
                this.alert.hide(true);
            }, 2000);

            return;
        }

        let data = {
            name: boardName
        };

        this.XHR.postWithAuthorization(`/boards`, JSON.stringify(data)).then(result => {
            this.alert.show(AlertType.Success, "Board created!", true);

            setTimeout(() => {
                this.alert.hide(true);
            }, 2000);
        }, error => {

            this.alert.show(AlertType.Error, error, true);

            setTimeout(() => {
                this.alert.hide(true);
            }, 2000);
        });
    }

    /**
     * Toggle the visibility of the sidebar.
     */
    public toggle() {
        const sidebar = $("#sidebar .side-nav");

        if (!sidebar.is(':visible')) {
            sidebar.show();
            sidebar.removeClass("slideOutRight");
            sidebar.addClass("slideInRight");
        }
        else {
            this.close();
        }
    }

    /**
     * Close the sidebar (if open).
     */
    public close() {

        const currentBoard = localStorage.getItem('board');
        if (currentBoard == null)
            return;

        const sidebar = $("#sidebar .side-nav");

        if (sidebar.is(':visible')) {
            sidebar.removeClass("slideInRight");
            sidebar.addClass("slideOutRight");

            setTimeout(function () {
                $(".side-nav").hide();
            }, 300);
        }
    }

}
