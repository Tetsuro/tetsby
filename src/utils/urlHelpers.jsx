import { globalHistory } from '@reach/router';

const currentPath = globalHistory.location.pathname;

export default function isPostPage() {
  console.log(currentPath);
  if (
    currentPath === '/' ||
    currentPath.includes('about-me') ||
    currentPath.includes('works')
  ) {
    console.log('on a main-menu page!');
    return false;
  } else {
    console.log('on a post page!');
    return true;
  }
}
