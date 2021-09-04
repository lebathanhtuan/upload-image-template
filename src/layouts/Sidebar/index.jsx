import history from '../../utils/history';

import * as Style from './styles';

const SIDEBAR_MENU = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: '',
  },
  {
    title: 'Product Manage',
    path: '/admin/products',
    icon: '',
  },
  {
    title: 'Category Manage',
    path: '/admin/categories',
    icon: '',
  },
  {
    title: 'To Do List',
    path: '/admin/to-do-list',
    icon: '',
  }
]

function Sidebar({ location, isShowSidebar }) {
  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
        <Style.SidebarItem
          key={`sidebar-${sidebarIndex}`}
          active={location.pathname === sidebarItem.path}
          onClick={() => history.push(sidebarItem.path)}
        >
          {sidebarItem.title}
        </Style.SidebarItem>
      )
    })
  }
  return (
    <Style.SidebarContainer show={isShowSidebar}>
      {renderSidebarMenu()}
    </Style.SidebarContainer>
  );
}

export default Sidebar;
