class app_class{
    
    getSideBarModule(link){
        var modules = [
            {
                name: 'Dashboard',
                link: 'dashboard',
                icon: 'tachometer-alt'
            },
            {
                name: 'Category',
                link: 'category',
                icon: 'list-alt'
            },
            {
                name: 'Products',
                link: 'products',
                icon: 'shopping-cart'
            },
            {
                name: 'User',
                link: 'users',
                icon: 'users'
            }
        ];

        var str='<nav class="mt-2"><ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">';

        var active = '';

        modules.forEach(e => {
            // xét active
            active = ( link.indexOf(e.link) == -1 ) ? '' : 'active';

            str +=`<li class="nav-item">
                <a href="admin/`+ e.link +`/index" class="nav-link `+ active +`">
                    <i class="nav-icon fas fa-`+e.icon+`"></i>
                    <p>`+ e.name +`</p>
                </a>
            </li>`;
        })

        str +='</ul></nav>';

        return str;
    }

    getInfoUser(){

        var str = '';

        str +=`<div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">Alexander Pierce</a>
            </div>
        </div>`;

        return str;
    }

    getInfoAdmin(){

        var str = '';

        str +=`<a href="dashboard/index" class="brand-link">
            <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8">
            <span class="brand-text font-weight-light">Admin</span>
        </a>`;

        return str;
    }

    getSideBar(link)
    {
        var str='<aside class="main-sidebar sidebar-dark-primary elevation-4">';
        
        str += this.getInfoAdmin();
        str += '<div class="sidebar">';
        str += this.getInfoUser();
        str += this.getSideBarModule(link);   
        str += '</div></aside>';

        return str;
    }
}

module.exports = app_class;