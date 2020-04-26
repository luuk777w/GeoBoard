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
            Handlebars.registerPartial('body', App.Templates[templateName](data));
            document.getElementById('view').innerHTML = App.Templates[configMap.layout]();
            $("#view").removeClass();
            $("#view").addClass(`${templateName}-view`);
            $("#view").addClass(configMap.layout.replace('_', '-'));

            setPageTitle(App.configMap.siteName, true);
        } else {
            throw new Error("Template does not exist.")
        }
    }

    const setPageTitle = function (title, withoutPrefix = false) {
        if (withoutPrefix) {
            document.title = title;
        }
        else {
            document.title = `${App.configMap.siteName} | ${title}`;
        }
    }

    return {
        init: _init,
        getTemplate,
        parse,
        loadhtml,
        setLayout,
        setPageTitle
    }
})();
