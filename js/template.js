App.Template = (function () {

    let configMap = {
        layout: "base_layout"
    }

    const _init = function () {
        console.log("init template");
    }

    const getTemplate = function (templateName) {
    }

    const parse = function (templateName, data) {

        return App.Templates[templateName](data);
    }

    const setLayout = function (layout) {
        if (typeof App.Templates[layout] === "function") {
            configMap.layout = layout;
        } else {
            throw new Error("Layout does not exist.")
        }
    }

    const loadhtml = function (templateName, data) {
        if (typeof App.Templates[templateName] === "function") {

            $("#page_css").remove();

            var link = document.createElement('link');
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("id", "page_css");
            link.onload = function () { cssDone(templateName, data); }
            link.setAttribute("href", `/dist/css/pages/${templateName}/style.css`);
            document.getElementsByTagName("head")[0].appendChild(link);

        } else {
            throw new Error("Template does not exist.")
        }
    }

    const cssDone = function (templateName, data) {
        Handlebars.registerPartial('body', App.Templates[templateName](data));
        document.getElementById('view').innerHTML = App.Templates[configMap.layout]();
        $("#view").removeClass();
        $("#view").addClass(`${templateName}-view`);
    }

    return {
        init: _init,
        getTemplate,
        parse,
        loadhtml,
        setLayout,
        cssDone
    }
})();