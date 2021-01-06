const sessions = require('../data/sessions');
const fUtil = require('../fileUtil');
const stuff = require('./info');

function toAttrString(table) {
	return typeof (table) == 'object' ? Object.keys(table).filter(key => table[key] !== null).map(key =>
		`${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`).join('&') : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(' ');
}
function toObjectString(attrs, params, navbar) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(' ')}>${toParamString(params)}</object>`;
}

module.exports = function (req, res, url) {
	if (req.method != 'GET') return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case '/videomaker/full': {
			let presave = query.movieId && query.movieId.startsWith('m') ? query.movieId :
				`m-${fUtil[query.noAutosave ? 'getNextFileId' : 'fillNextFileId']('movie-', '.xml')}`;
			title = 'Import/edit video on the Legacy Video Maker';
			attrs = { 
				data: process.env.SWF_URL + '/go_full.swf',
				type: 'application/x-shockwave-flash', width: '100%', height: '100%',
			};
			params = {
				flashvars: {
					'apiserver': 'http://localhost/', 'storePath': process.env.STORE_URL + '/<store>', 'isEmbed': 1, 'ctc': 'go',
					'ut': 60, 'bs': 'default', 'appCode': 'go', 'page': '', 'siteId': 'go', 'lid': 13, 'isLogin': 'Y', 'retut': 1,
					'clientThemePath': process.env.CLIENT_URL + '/<client_theme>', 'themeId': 'business', 'tlang': 'en_US',
					'presaveId': presave, 'goteam_draft_only': 1, 'isWide': 1, 'nextUrl': '/dashboard/videos',
				},
				allowScriptAccess: 'always',
			};
			sessions.set({ movieId: presave }, req);
			break;
		}
		default:
			return;
	}
	res.setHeader('Content-Type', 'text/html; charset=UTF-8');
	Object.assign(params.flashvars, query);
	res.end(
	`<link rel="stylesheet" href="/html/css/common_combined.css.gz.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700"><link rel="stylesheet" href="/html/css/importer.css.gz.css"><link rel="stylesheet" href="/html/css/studio.css.gz.css"><script href="/html/themelist/themelistfiles/common_combined.js.gz.js"></script><script>document.title='${title}',flashvars=${JSON.stringify(
	params.flashvars
	)}</script><body style="margin:0px">
<div id="studio_container style="width: 1307px; height: 969px;">
<div id="previewPlayerContainer" style="display: none;">
        <div class="preview-player" id="previewPlayer">
            <h2>Preview Video</h2>
            <div id="playerdiv"><object data="https://bluepeacocks.github.io/NewGA4SRCloudfrontServer/animation/414827163ad4eb60/player.swf" type="application/x-shockwave-flash" id="Player" width="640" height="360"><param name="quality" value="high"><param name="scale" value="exactfit"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="wmode" value="window"><param name="flashvars" value="movieOwner=&amp;movieOwnerId=&amp;movieId=&amp;ut=-1&amp;movieLid=8&amp;movieTitle=&amp;movieDesc=&amp;userId=&amp;username=&amp;uemail=&amp;apiserver=http%3A%2F%2Flocalhost%2F&amp;thumbnailURL=&amp;copyable=0&amp;isPublished=0&amp;ctc=go&amp;tlang=en_US&amp;is_private_shared=0&amp;autostart=1&amp;appCode=go&amp;is_slideshow=0&amp;originalId=0&amp;is_emessage=0&amp;isEmbed=0&amp;refuser=&amp;utm_source=&amp;uid=&amp;isTemplate=1&amp;showButtons=0&amp;chain_mids=&amp;showshare=0&amp;averageRating=&amp;s3base=https%3A%2F%2Fweb.archive.org%2Fweb%2F20180930132917%2Fhttps%3A%2F%2Fs3.amazonaws.com%2Ffs.goanimate4schools.com%2F&amp;ratingCount=&amp;fb_app_url=https%3A%2F%2Fweb.archive.org%2Fweb%2F20180930132917%2Fhttps%3A%2F%2Fgoanimate4schools.com%2F&amp;numContact=0&amp;isInitFromExternal=1&amp;storePath=https%3A%2F%2Fbluepeacocks.github.io%2FNewGA4SRCloudfrontServer%2Fstore%2F3a981f5cb2739137%2F%3Cstore%3E&amp;clientThemePath=https%3A%2F%2Fbluepeacocks.github.io%2FNewGA4SRCloudfrontServer%2Fstatic%2Fad44370a650793d9%2F%3Cclient_theme%3E&amp;animationPath=https%3A%2F%2Fbluepeacocks.github.io%2FNewGA4SRCloudfrontServer%2Fanimation%2F414827163ad4eb60%2F&amp;startFrame=1"><param name="movie" value="https://bluepeacocks.github.io/NewGA4SRCloudfrontServer/animation/414827163ad4eb60/player.swf"></object></div>
            <div class="buttons clearfix">
                <button class="preview-button edit" onclick="switchBackToStudio();">Back to editing</button>
                <button class="preview-button save" onclick="publishStudio();">Save Now</button>            </div>

            <a class="close_btn" href="#" onclick="switchBackToStudio(); return false;">×</a>
        </div>
    </div>
<div class="ga-importer">
        <div class="ga-importer-header">
            <form class="ga-importer-base-form" action="/web/20180930132917/http://vyondhoster.000webhostapp.com/ajax/saveUserProp" method="post">
                <a class="ga-importer-collapse" href="#" title="Collapse" onclick="hideImporter(); return false;">×</a>
                <div class="fileinputs">
                    <div class="importer-button file-trigger" style="width:140px;">SELECT FILES</div>
                    <input class="ga-importer-file-input" type="file" name="file" multiple="">
                </div>
                <span class="hints">
                    <i class="i-help"></i>
                    <div class="tooltip in" style="display:none;">
                        <div class="tooltip-arrow"></div>
                        <div class="tooltip-inner">
                            <ul>
                                <li>Maximum file size: 15MB</li>
                                <li>Images: JPG, PNG<br>To cover the whole stage in a 1080p video, use an image at least 1920px x 1080px.</li>
                                <li>Audio: MP3, WAV, M4A</li>
                                    <li>Video: MP4, SWF.</li>
                                </ul>
                        </div>
                    </div>
                </span>
                <input type="hidden" name="subtype" value="">
            </form>
        </div>
        <div class="ga-importer-content" style="height: 918px;">
            <div class="ga-importer-start">
                <div class="ga-importer-start-draghere">Drag files here</div>
                <div class="ga-importer-instruction general">
                    <ul>
                        <li><strong>Maximum file size:</strong> 15MB</li>
                        <li><strong>Images:</strong> JPG, PNG<br>To cover the whole stage in a 1080p video, use an image at least 1920px x 1080px.</li>
                        <li><strong>Audio:</strong> MP3, WAV, M4A</li>
                            <li><strong>Video:</strong> MP4, SWF. For more information about uploading SWF files, please click <a href="#" onclick="$('.ga-importer-instruction').toggle(); return false;">here</a>.</li>
                        </ul>
                </div>
                <div class="ga-importer-instruction for-swf" style="display: none;">
                    <p class="text-center"><b>For a .swf file</b></p>
                    <ul>
                        <li><strong>Frame rate:</strong> 24 frames per second</li>
                        <li><strong>Flash Player version:</strong> 9</li>
                        <li><strong>Load order:</strong> Bottom up</li>
                        <li><strong>Action Script version:</strong> 3.0<br>You may use limited frame-navigation functions in ActionScript functions like "gotoAndPause", "pause" or "play". Please note that ActionScript functions may create problems when users watch a video and drag the player timeline manually.</li>
                        <li><strong>Content positioning:</strong> Place the center of your prop at the origin of your stage (i.e. x=0 and y=0).</li>
                    </ul>
                    <div class="text-center"><a href="#" onclick="$('.ga-importer-instruction').toggle(); return false;">Back</a></div>
                </div>
            </div>
            <div class="ga-importer-results">
                <div class="ga-importer-notice clearfix"><span class="ga-importer-notice-count pull-left">0 file have been added to Your Library.</span> <a class="ga-importer-notice-clear pull-right" href="#">Clear</a></div>
                <ul class="ga-importer-files"></ul>
            </div>
            <div class="ga-importer-queue-message">
                Assign a category to start importing
                <span class="hints pull-right">
                    <i class="i-help"></i>
                    <div class="tooltip in" style="display:none;">
                        <div class="tooltip-arrow"></div>
                        <div class="tooltip-inner">
                            <p>Imported files are categorized to simplify browsing.</p>
                            <p>Use the "IMPORT AS" drop down to see the available categories based on the format of the file you import.</p>
                        </div>
                    </div>
                </span>
            </div>
            <ul class="ga-importer-queue"></ul>
        </div>
        <div class="ga-import-dnd-hint">
            Release to start uploading        </div>
			
    </div>
<div id="studio_holder">
${toObjectString(attrs, params)}
</div>
</div>
	</body>${stuff.pages[url.pathname] || ''}`
		);
	return true;
}
