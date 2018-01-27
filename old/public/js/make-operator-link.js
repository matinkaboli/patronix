function fixLink(tagID, attr = 'href') {
  const op = document.getElementById(tagID);
  const currentLink = window.location.pathname.split('/');
  const id = currentLink.filter(piece => piece.length === 24)[0];

  let URL = op[attr];
  URL = URL.replace('id', id);

  op[attr] = URL;
}
