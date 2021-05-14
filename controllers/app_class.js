class app_class {

    get_url_module(url){
        return url.split('/')[2];
    }

    getSideBarModule(link) {
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

        var str = '<nav class="mt-2"><ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">';

        var active = '';

        modules.forEach(e => {
            // xét active
            active = (link.indexOf(e.link) == -1) ? '' : 'active';

            str += `<li class="nav-item">
                <a href="admin/`+ e.link + `/index" class="nav-link ` + active + `">
                    <i class="nav-icon fas fa-`+ e.icon + `"></i>
                    <p>`+ e.name + `</p>
                </a>
            </li>`;
        })

        str += '</ul></nav>';

        return str;
    }

    getInfoUser() {

        var str = '';

        str += `<div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">Alexander Pierce</a>
            </div>
        </div>`;

        return str;
    }

    getInfoAdmin() {

        var str = '';

        str += `<a href="dashboard/index" class="brand-link">
            <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8">
            <span class="brand-text font-weight-light">Admin</span>
        </a>`;

        return str;
    }

    // SHOW DYNAMIC SIDEBAR
    // ::::::::::::::::::::::::::::::::::::
    getSideBar(link) {
        var str = '<aside class="main-sidebar sidebar-dark-primary elevation-4">';

        str += this.getInfoAdmin();
        str += '<div class="sidebar">';
        str += this.getInfoUser();
        str += this.getSideBarModule(link);
        str += '</div></aside>';

        return str;
    }

    // SHOW BUTTON ADD DATA
    // ::::::::::::::::::::::::::::::::::::
    get_str_FucntionAdd(name_module) {
        var str = '<h3 class="card-title">';
        str += '<a href="admin/' + name_module + '/add" class="btn btn-dark btn-sm">';
        str += '<small><i class="fas fa-plus"></i> </small> Add Record' ;
        str += '</a></h3>';

        return str;
    }

    // GET LINK ACTIVE
    // ::::::::::::::::::::::::::::::::::::
    button_add_data(url) {
        var arr_url = url.split('/');
        return this.get_str_FucntionAdd(arr_url[2]);
    }

    get_str_input_type_text(name, key) {
        var str = '<div class="form-group"';
        str += ' <label for="' + key + '">' + name + '</label>';
        str += '<input type="text" class="form-control" id="' + key + '" name="' + key + '" placeholder="Enter ' + name + '">';
        str += '</div>';

        return str;
    }


    // SHOW INPUT FORM CATEGORY PAGE
    // ::::::::::::::::::::::::::::::::::::
    get_str_form_categories() {
        var form = '';
        form += this.get_str_input_type_text('Name', 'name');
        form += this.get_str_input_type_text('Username', 'username');
        return form;
    }

    // SHOW USER DATALIST IN INDEX
    // ::::::::::::::::::::::::::::::::::::
    show_table_data(data = []) {
        var str = `<table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Create_At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;
        var i=0;
        data.forEach(e => { i++;

            str += `<tr>
                    <td>` + i +`</td>
                    <td>` + e.username +`</td>
                    <td>` + e.email +`</td>
                    <td>` + e.phone +`</td>
                    <td>` + e.create_at +`</td>
                    <td><input class="custom-checkbox" type="checkbox"></td>
                    <td>
                        <a href="admin/category/edit/1"><i class="fas fa-edit text-dark"></i></a>&nbsp;
                        <a href="javascript:;" data-toggle="modal" data-target="#modal-default">
                            <i class="fas fa-trash text-danger"></i>
                        </a>
                    </td>
                    </tr>`;
            });
        
            str += `</tbody></table>`;

            return str;
    }

    // REPLACE LABEL NAME
    // ::::::::::::::::::::::::::::::::::::
    replace_field(name) {

        var kq = '';

        switch (name) {
            case 'username': kq = 'Username';
                break;
            case 'password': kq = 'Password';
                break;
            case 'email': kq = 'Email Address';
                break;    
            case 'phone': kq = 'Phone Number';
                break;    
            default:
                kq = 'undefine';
                break;
        }
        return kq;
    }

    // SHOW FORM ADD NEW USER
    // ::::::::::::::::::::::::::::::::::::
    show_form(data = []) {
        
        var str = `<form action="" role="form" id="submitForm"><div class="card-body">`;

        data.forEach(e => {
            
            var name_replace = this.replace_field(e.name);
            var asterisks = (e.required == 'required') ? '<span class="text-danger">*</span>' : '';

            if (e.element == 'input') {
                str += `<div class="form-group">
                <label for="`+ e.name +`">`+ name_replace + asterisks +`</label>
                <input type="`+ e.type +`" class="form-control" id="`+ e.name +`" placeholder="Enter `+ name_replace +`">
                <span class="err err_`+e.name+`"></span>
                </div>`;
            }
        });

        str +=`</div><div class="card-footer">
            <button type="submit" class="btn btn-dark">Save</button>
        </div>`;

        str +=`</form>`;

        return str;
    }
}

module.exports = app_class;