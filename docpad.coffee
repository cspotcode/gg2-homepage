# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

    # Disable DocPad sending error reports and statistics
    reportErrors: false
    reportStatistics: false
    airbrakeToken: 'a'
    mixpanelToken: 'a'

    # Plugin config
    plugins:
        jade:
            jadeOptions:
                basedir: require('path').resolve './src'
                pretty: false

    # =================================
    # Template Data
    # These are variables that will be accessible via our templates
    # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

    templateData:

        # Specify some site properties
        site:
            # The production url of our website
            url: "http://ganggarrison.com"

            # Here are some old site urls that you would like to redirect from
            oldUrls: [
            ]

            # The default title of our website
            title: "Gang Garrison 2"

            # The website description (for SEO)
            description: """
                TODO When your website appears in search results in say Google, the text here will be shown underneath your website's title.
                """

            # The website keywords (for SEO) separated by commas
            keywords: """
                TODO place, your, website, keywoards, here, keep, them, related, to, the, content, of, your, website
                """

        # TODO currently all site-specific styles and scripts are included directly
        # in the default template instead of being listed here

        # The website's styles
        styles: [
            #'/vendor/normalize.css'
            #'/vendor/h5bp.css'
            #'/styles/style.css'
        ]

        # The website's scripts
        scripts: [
            #'/vendor/log.js'
            #'/vendor/modernizr.js'
            #'/scripts/script.js'
        ]

        # Whether or not the templates should render PHP or SSI code.
        # E.g. the download counter or the News section.
        # During development, this can be false.  When rendering to upload to the actual website, set it to yes.
        useSSI: false

        # -----------------------------
        # Helper Functions

        # Get the prepared site/document title
        # Often we would like to specify particular formatting to our page's title
        # we can apply that formatting here
        getPreparedTitle: ->
            # if we have a document title, then we should use that and suffix the site's title onto it
            if @document.title
                "#{@document.title} | #{@site.title}"
            # if our document does not have it's own title, then we should just use the site's title
            else
                @site.title

        # Get the prepared site/document description
        getPreparedDescription: ->
            # if we have a document description, then we should use that, otherwise use the site's description
            @document.description or @site.description

        # Get the prepared site/document keywords
        getPreparedKeywords: ->
            # Merge the document keywords with the site keywords
            @site.keywords.concat(@document.keywords or []).join(', ')

        # Get a relative URL from `from` to `to`
        getRelativeURL: (from, to) ->
            path = require('path')
            path.relative(path.dirname(from), to).split(path.sep).join('/') || './'


    # =================================
    # DocPad Events

    # Here we can define handlers for events that DocPad fires
    # You can find a full listing of events on the DocPad Wiki
    events:

        # Server Extend
        # Used to add our own custom routes to the server before the docpad routes are added
        serverExtend: (opts) ->
            # Extract the server from the options
            {server} = opts
            docpad = @docpad

            # As we are now running in an event,
            # ensure we are using the latest copy of the docpad configuraiton
            # and fetch our urls from it
            latestConfig = docpad.getConfig()
            oldUrls = latestConfig.templateData.site.oldUrls or []
            newUrl = latestConfig.templateData.site.url

            # Redirect any requests accessing one of our sites oldUrls to the new site url
            server.use (req,res,next) ->
                if req.headers.host in oldUrls
                    res.redirect(newUrl+req.url, 301)
                else
                    next()
}

# Export our DocPad Configuration
module.exports = docpadConfig