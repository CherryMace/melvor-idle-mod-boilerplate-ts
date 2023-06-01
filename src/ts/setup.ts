// Modules
// You can import script modules and have full type completion
import Greeter from '../components/Greeter/Greeter';

// Data
// Game data for registration
import ModData from '../data/data.json';

// Styles
// Will automatically load your styles upon loading the mod
import '../css/styles.css';

// Images
// To bundle your mod's icon
import '../img/icon.png';
// Reference images using `ctx.getResourceUrl`
import LargeIcon from '../img/icon_large.png';

export async function setup(ctx: Modding.ModContext) {
  // Register our GameData
  await ctx.gameData.addPackage(ModData);

  // Because we're loading our templates.min.html file via the manifest.json,
  // the templates aren't available until after the setup() function runs
  ctx.onModsLoaded(() => {
    const root = document.createElement('div');
    ui.create(Greeter({ name: 'Melvor' }), root);

    sidebar.category('Modding').item('Mod Boilerplate', {
      icon: ctx.getResourceUrl('img/icon.png'),
      onClick() {
        open(ctx, root);
      },
    });
  });
}

function open(ctx: Modding.ModContext, html: HTMLElement) {
  SwalLocale.fire({
    iconHtml: `<img class="mbts__logo-img" src="${ctx.getResourceUrl(LargeIcon)}" />`,
    title: ctx.name,
    html,
  });
}