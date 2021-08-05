page:https://a076902768.github.io/xayb/

nuxt上傳至github所需套件: cross-env、push-dir

一.更改package.json:

	"homepage": "https://<username>.github.io/<專案名稱>",

	script:

	"build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
	"generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate",
	"deploy": "push-dir --dir=dist --branch=gh-pages --cleanup", // deploy內的dist為要上傳的資料夾，gh-pages為要push的分支名稱，--cleanup會在上傳後自動刪除本地分支


二.更改nuxt.config.js:
	const routerBase =
	  process.env.DEPLOY_ENV === 'GH_PAGES'
		? {
		  router: {
			base: '/xayb/'
		  }
		}
		: {}
	
	export default: {
	...routerBase,
	}



