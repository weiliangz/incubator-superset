import * as pbi from 'powerbi-client';

const $ = require('jquery');

function embeddedPowerBIWidget(slice) {
  // $('#code').attr('rows', '15');
//   const url = slice.render_template(slice.formData.url);
//   slice.container.html('<iframe style="width:100%;"></iframe>');
//   const iframe = slice.container.find('iframe');
//   iframe.css('height', slice.height());
//   iframe.attr('src', url);

    const content = '<div id="embedContainer" style="width:100%; height: 800px"></div>';

    slice.container.html(content);

    // let powerbi = window.powerbi;
    // This is the  embed application access token.
    const txtAccessToken = 'H4sIAAAAAAAEAB2WxQ7sWA5A_-Vt01KwAi31IsycVGAXZuaM5t-npu_aurKO7WP_54-VPP2U5H_-_hOxCb4oKH4zjL2JfcrCNdSt7rDhn2nqHf3DuSd_1LyT8XndBa67CR4rbXYJ3PH6xYEH7nKlq2PoOepiuSt8fHJyX1KQoQsRUutyWSh9ePVxkl-ypblRuz7Ybj9AUm9U0AIutGXDxo3hspgFXBGcnR6g69NxOH4QsAHR8mjQrKCwl3hLrRXtTys2rs-GJEpG1dPoKzSQ_hPVx9UipOo7-BlqvvN4I7Wt9-tgkZ_d9zvP2VNz8Og_34ZlQnCosKtiZRACGsPy0IIahZekwNiW_GKXzy_KmymZmTWJt9zwIAfYVcBHKsQAk29Wp7yziuK5Dkk8nAnZT9DBjfl3GMFZ9YBrUUGRH3YOlcMDkTYu8xpqsfhOz09qM7bMxOop4AWk-lGIzxk5v4ooKEDOlY9hGfyUlKRGxTWwNlsqqPA72JMBb3wcKJxXapj8dAYjknR2Y-Fe6ScrlzFX8zKmAchOIlNkVUX8dVT5Sqb982F57PXt4GonuyovI1zv4jEV1kAzpvkcF1JWLfvcCU13YH6WoJHrMmlPVCQZGeI-hJZdkwvh3VkTi90L7r77yYfSbVvnbDILohCEwp2TecJB7THgz45j0AKqmAVDivatlxsYZsiIwRURcboMdpaNFkKtD-V489eYsSDNkgk1tg2YYZhEleBgC8mpWU36xGHWBTaLx4QEFzf9AWSIAzVE5rL0l89XHe-ryF9B877pLS1XwLMr5Ji94BWNa4_KgySkunOYcUf1IpVHzqzq2W2TOuITAoK2i-GAfkVQXOwU--VPVqgdDMzVk4eqCmh2joA-uFoHIZYaDHYoFM2zjGVa-XAkVu5EHhNb0zSy3DvuGaleBVj2IvuxyhoWTTUYWRDBKAmUlai2ZSq96AMwq2RHLuOa3iiBEsIL8tYHyasjq7TXnnfl7mbEV9zzKYmpmfeZzemLZbeHPl3ZneHhJcFOnWWO8LSmETivOE9Y3nROqijeCnVTIO9RBVg7DTpvq7wxqG_WX92Hyz8f-5vOciPAR1LTSEyaXVnd6Plu8dXyGEBB19VrR42lT5kG7UMXEaPO9T0LzcD19nXnd6MtThHnhFWdrkgjyk3dqPlQpuIoUySKFgxGMFW0UgYwQWFczPmtAVh5xRbqSCgrkmptwptOSyVnv94bYzELSZBdaGB3itKYTJqUeDiUd8flG7-CzkJ552yfbSJhUiWsHURknJZsYVysKrsbJFRIfEPUZzTMpAPjEV_pVdEo11HRfwKykUEPg-zL1bOO_bXf8aWpJhHLobBJVI7MdhA8P26OICtZ_VcYFa44QxDjZgDxaaZXuluhKo1CTH9STnLKWchPhLGEknqy5sMPCxPyrCMknV9trEu6WVRZLCCJi_NECRMwxFWEXeFyala7mJiodsuaY67WQz7hRKrFO-1I-YtbY-HM8g4lKFRlU2Z2na5tvLrdjxl6QXnrfVtuTkO8J1765ioAeh3xekXW10n7pTetr4YEF6IVG0qlLW44I3sBrr0K8PblBJvxmaNeaZPUalq7mWcQDjkL9C9U7Z72zt5CQhhI5F4YYi4wm6DtC0qbysL7fNyfuYC5CQ6pAInDK16VqhvaXOmsKjX16rjbcB0QPhh8pD_lE-mz1HFdBvpQJunBNjKd1Upmym38MITPFAtK2hZF-PQ-cQNA2-nup4IeNFPqTcYvGQCGb2qtGAp_Uw-gT3ucQfsArdLuxUNO6cX1G9v4OthpVoHCEtZuX2F5EpSHUffdH2KeKzqFaGjd88-wJ-1Z870Vjd8BKGqRKVhgQcmqulUCm1O5E9fhcAKObX4yf_aOxStizDvtUtuTPkS2SsTNmvmgZZ08CVTK2DNNBJE1pVhT8qYsvThJGJYXV5u1kIoMwQNl4EvBPaNTkRXunK_2m0DWWexKxNCBPhjO5Nxtb_gdPSzboL22Oys1eDuvCuot7dDzCV-q6c7BUVrMrSWoYbM_ET_lBfTnh-Ly9Y3Tmg4vcdDDXME-SLwkC-Xaxu3O7eJC9rhpeCbthwxI28aTpH1ZxRcGzejsvwAIwChelA1P9HhKo3ABsXHGJnrX2shwMJeg4XTYNB_kPF2c7cFTFQtF3D7QLlpOk3JQ9s-fv_6w6zPvk1o8v9NBTKkSy6QmDp7xp8PSby39ePA0QUBiLT_68i3Yw3AvC9mfIrc0uvitWJ1QmcMGZ_Nydw8o3TO9O87jaB78TcrlaH4V2JUAwK4gALkhe6xKRcU944lO-YVilo-Y4nrhAvw0POyHe3tYHLfPHALSA_y8tcffpLMF7A1MoCzUGKbPLo9nt7g8fBIEX-Wo2-fHNNNp1JXQW49cNaVCK48-b8A07Q77RvW5N77vupQ1s_aMVxWqEw2OLl9X7Rk-0RKBel464doUihaKKD4r0hgMJS9kBMaZw6gFaWuwoA3wdqNpYw4lKn0Tk_CtS07tWVReBdMtW_k9yflCkOsg_HBaogJvXp3-51_Mz1wXq_z9UbZ6uktUHD-GxF029dlOoCeqf6PcphqT_ViLX5iEdz7XDIZ4FFOgjtD7xB_uoQr-rc7YdREutcrTEBLxNL59CyDF71sbLdKOOOFbs1TTUL6f07xqG16rZLwTcucPaH3e8JFvUA2LOJpOaeunCBJwgSgw6KpbYdc6h4RdqJT0Xl6cHUyw-gcz0XxRlAtLTvtFuZprc961dWxuwXIySK25uec9rwwAV_wRAJ_6M-zffvtCTnXQObaQYY5pyRcBL_uGnwcshd_TfUKqofuhUmee1pCWl7NY9iGN0bMvclUTUSaeEYdC0_RkJ_EShIcaACpclMTaDlXx1AMF1_x0f4INXICgIK-zR24FMVP9zUw0CIqqU9M9_RZtu0vmRkzY_zH_93-NdESnLgsAAA==';
    // The embed URL
    const txtEmbedUrl = 'https://app.powerbi.com/reportEmbed?reportId=8a5b15cc-e026-4d5d-94c0-db5091d65614&groupId=be8908da-da25-452e-b220-163f52476cdd';

    // Read report Id
    const txtEmbedReportId = '8a5b15cc-e026-4d5d-94c0-db5091d65614';

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    const config = {
        type: 'report',
        tokenType: 1,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedReportId,
        permissions: 7,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
        },
    };

    // Get a reference to the embedded report HTML element
    const embedContainer = $('#embedContainer')[0];

    // Embed the report and display it within the div container.
    const report = powerbi.embed(embedContainer, config);

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
