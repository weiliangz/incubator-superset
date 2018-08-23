import * as pbi from 'powerbi-client';

const $ = require('jquery');

function embeddedPowerBIWidget(slice) {
  // $('#code').attr('rows', '15');
//   const url = slice.render_template(slice.formData.url);
//   slice.container.html('<iframe style="width:100%;"></iframe>');
//   const iframe = slice.container.find('iframe');
//   iframe.css('height', slice.height());
//   iframe.attr('src', url);

    const content = '<div id="tileContainer" style="width:100%; height: 800px"></div>';

    slice.container.html(content);

    const fd = slice.formData;
    // This is the  embed application access token.
    const txtAccessToken = slice.render_template(fd.token);
    // The embed URL
    const txtEmbedUrl = slice.render_template(fd.embed_url);

    // Read report Id
    const txtEmbedDashboardId = slice.render_template(fd.dashboard_id);

    const txtEmbedTileId = slice.render_template(fd.title_id);

    

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    const config = {
        type: 'tile',
        tokenType: 1,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedTileId,
        dashboardId: txtEmbedDashboardId
    };

    // Get a reference to the embedded report HTML element
    const tileContainer = $('#tileContainer')[0];

    // Embed the report and display it within the div container.
    const report = powerbi.embed(tileContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off('loaded');

    // Report.on will add an event handler which prints to Log window.
    report.on('loaded', function () {
        console.logText('Loaded');
    });

    report.on('error', function (event) {
        console.log(event.detail);

        report.off('error');
    });

    report.off('saved');
    report.on('saved', function (event) {
        console.log(event.detail);
        if (event.detail.saveAs) {
            console.log('In order to interact with the new report, create a new token and load the new report');
        }
    });
}

module.exports = embeddedPowerBIWidget;
