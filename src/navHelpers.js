const $ = window.$;

export const restStickyNavBar = () => {
  $(".sticky").unstick();
  $(".sticky").sticky({
    topSpacing: 0
  });
};