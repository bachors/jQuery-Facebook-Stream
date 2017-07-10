jQuery-iBacor-Facebook-Streaming
================================

Display all your wall post, comments &amp; likes in groups(PUBLIC) or fans page.
<h1>Example</h1>
<h2>HTML</h2>
<pre>&lt;div class="fanspage"&gt;&lt;/div&gt;
            
&lt;div id="groups"&gt;&lt;/div&gt;</pre>
<h2>jQuery</h2>
<pre>$(document).ready(function(){
    // Example by className
    $(".fanspage").ifbs(
        fb_id = 150096141782295, // example your Groups_id or FansPage_id. Find your facebook_id in http://ibacor.com/tools/social-media-user-id-finder
        fb_limit = 5, // max 25
        fb_token = '45534553|644Et1tuyYta_25j6j4jkkAg8V1jI' // Your facebook access_token. you can get it in https://developers.facebook.com/docs/apps
    );
    // Example by id
    $("#groups").ifbs(
        fb_id = 35688476100, // example your Groups_id or FansPage_id. Find your facebook_id in http://ibacor.com/tools/social-media-user-id-finder
        fb_limit = 5, // max 25
        fb_token = '45534553|644Et1tuyYta_25j6j4jkkAg8V1jI' // Your facebook access_token. you can get it in https://developers.facebook.com/docs/apps
    );
});</pre><br>

<a href="http://bachors.com/tools/social-media-user-id-finder" target="_BLANK">Find your facebook id ?</a>


