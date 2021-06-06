export function getHero(json) {

    const container = document.querySelector(".hero");

    container.style = `background-image: url('${json.hero_banner.formats.large.url}');`
}