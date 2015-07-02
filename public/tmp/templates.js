angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("/app/common/dvDatePicker.html","<p class=input-group><input type=text datepicker-popup=dd/MM/yy show-button-bar=false ng-model=dpDate is-open=opened close-text=Close class=form-control> <span class=\"input-group-btn dpCal\"><button type=button ng-click=open($event) class=\"btn btn-primary\"><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p>");
$templateCache.put("/app/common/messages.html","<span ng-message=required class=dpError>This field is required</span> <span ng-message=minlength class=dpError>This has a minimum length</span> <span ng-message=maxlength class=dpError>This has a maximum length</span> <span ng-message=email class=dpError>Enter a valid email address</span>");
$templateCache.put("/app/account/admin.html","Welcome to the admin page<div><label class=col-sm-2 for=custName>Task Owner :</label><div class=col-sm-4><select ng-model=vm.cust ng-options=\"cust for cust in vm.customers\" class=form-control></select></div></div><button ng-click=vm.setMode(vm.cust) class=\"btn btn-danger\">Set</button>");
$templateCache.put("/app/account/changePass.html","<div class=modal-header><h4 class=modal-title><span class=\"glyphicon glyphicon-lock\"></span>Enter your new password - {{vm.identity.currentUser.firstName + \" \" + vm.identity.currentUser.lastName}}</h4></div><div class=modal-body><ng-form name=nameDialog novalidate role=form></ng-form><div class=\"form-group input-group-lg\"><input id=password type=password required placeholder=\"Enter your new password\" ng-model=vm.password class=form-control></div></div><div class=modal-footer><button ng-click=vm.commit() class=\"btn btn-primary\">Change Password</button></div>");
$templateCache.put("/app/account/navbar-login.html","<div ng-controller=\"NavBarLoginCtrl as vm\" class=navbar-right><form ng-hide=vm.identity.isAuthenticated() class=navbar-form><div class=form-group><input placeholder=Username ng-model=vm.username class=form-control></div><div class=form-group><input type=password placeholder=Password ng-model=vm.password class=form-control></div><button ng-click=\"vm.signin(vm.username, vm.password)\" class=\"btn btn-primary\">Sign In</button></form><ul ng-show=vm.identity.isAuthenticated() class=\"nav navbar-nav navbar-right\"><li dropdown=dropdown class=dropdown><a href=\"/\" dropdown-toggle=dropdown-toggle class=\"dropdown-toggle dv-log-white\">{{vm.identity.currentUser.firstName + \" \" + vm.identity.currentUser.lastName}}<b class=caret></b></a><ul class=dropdown-menu><li ng-show=vm.identity.currentUser.isAdmin()><a ui-sref=\"profile({ id: \'new\' })\">New User</a></li><li ng-show=vm.identity.currentUser.isAdmin()><a ui-sref=\"profile({ id: \'edit\' })\">Edit User</a></li><li ng-show=vm.identity.currentUser.isAdmin()><a ui-sref=Admin>Admin</a></li><li><a href ng-click=vm.openPass()>Change Password</a></li><li><a href ng-click=vm.signout()>Sign Out</a></li></ul></li></ul></div>");
$templateCache.put("/app/account/profile.html","<div class=\"well col-md-6 col col-lg-offset-2\"><form name=profileForm class=form-horizontal><legend>User Profile</legend><div class=form-group></div><label for=username class=\"col-md-4 control-label\">User Name</label><div ng-if=!vm.new class=col-md-8><select ng-model=vm.fUsers ng-options=\"user.firstName + \' \' + user.lastName + \' (\' + user.username + \' )\' for user in vm.users\" class=form-control><option value>--Select Username--</option></select></div><div ng-if=vm.new class=col-md-8><input type=text name=username placeholder=\"User Name\" ng-model=vm.fUsers.username required class=form-control></div><div class=form-group></div><label for=fname class=\"col-md-4 control-label\">First Name</label><div class=col-md-8><input type=text name=fname placeholder=\"First Name\" ng-model=vm.fUsers.firstName required class=form-control></div><div class=form-group></div><label for=lname class=\"col-md-4 control-label\">Last Name</label><div class=col-md-8><input type=text name=lname placeholder=\"Last Name\" ng-model=vm.fUsers.lastName required class=form-control></div><div class=form-group></div><label for=roles class=\"col-md-4 control-label\">Roles</label><div class=col-md-8><select name=roles type=text placeholder=Roles ng-model=vm.fUsers.roles ng-options=\"r for r in vm.listRoles\" class=form-control><option value></option></select></div><div class=form-group></div><label for=password class=\"col-md-4 control-label\">Password</label><div class=col-md-8><input type=password name=password ng-model=vm.fUsers.password class=form-control></div><div class=form-group></div><div class=\"col-md-8 col-md-offset-4\"><div class=pull-right><button ng-click=vm.update(profileForm) ng-disabled=signupForm.$invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a> <button ng-click=vm.delete(fUsers) class=\"btn btn-danger\">Delete</button></div></div></form></div>");
$templateCache.put("/app/account/signup.html","<div class=well><form name=signupForm class=form-horizontal><fieldset><legend>New User Information</legend><div class=form-group><label for=username class=\"col-md-2 control-label\">User Name</label><div class=col-md-10><input type=username name=username placeholder=\"User Name\" ng-model=vm.username required class=form-control></div></div><div class=form-group><label for=password class=\"col-md-2 control-label\">Password</label><div class=col-md-10><input type=password name=password placeholder=Password ng-model=vm.password required class=form-control></div></div><div class=form-group><label for=fname class=\"col-md-2 control-label\">First Name</label><div class=col-md-10><input type=text name=fname placeholder=\"First Name\" ng-model=vm.fname required class=form-control></div></div><div class=form-group><label for=lname class=\"col-md-2 control-label\">Last Name</label><div class=col-md-10><input type=text name=lname placeholder=\"Last Name\" ng-model=vm.lname required class=form-control></div></div><div class=form-group><div class=\"col-md-10 col-md-offset-2\"><div class=pull-right><button ng-click=vm.signup() ng-disabled=signupForm.$invalid class=\"btn btn-primary\">Submit</button><a href=\"/\" class=\"btn btn-default\">Cancel</a></div></div></div></fieldset></form></div>");
$templateCache.put("/app/deviations/devDetailView.html","<form name=devDetailsForm novalidate class=\"form-horizontal well dv-well\"><fieldset><div class=form-group ng-class=\"{\'has-error\': devDetailsForm.devMatNo.$invalid && devDetailsForm.devMatNo.$dirty }\"><label class=\"col-sm-2 control-label\" for=devMatNo>Material Number:</label><div class=col-sm-4><input class=form-control id=devMatNo type=text name=devMatNo required ng-model=vm.deviation.dvMatNo ng-minlength=5 ng-maxlength=51 placeholder=\"Enter Material No. ( Required, Min 5 character )\"></div><div class=col-sm-2></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=devMatName>Material Name:</label><div class=col-sm-9><input class=form-control id=devMatName type=text required name=devMatName placeholder=\"Enter Item Description ( Required, Min 5 characters )\" ng-model=vm.deviation.dvMatName ng-minlength=10 maxlength=125></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=devBatNo>Batch Number:</label><div class=col-sm-4><input id=devBatNo type=text name=devBatNo required ng-minlength=5 maxlength=51 placeholder=\"Enter Batch / Lot ( Required, Min 5 characters )\" class=form-control ng-model=vm.deviation.dvBatchNo></div><div class=col-sm-7></div></div><div class=form-group><label class=\"col-md-2 control-label\">Date of Manufacture:</label><div class=col-sm-2><dv-date-picker dp-date=vm.deviation.dvDOM></dv-date-picker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=devDescribe>Describe the Deviation</label><div class=col-sm-9><textarea class=form-control id=devDescribe rows=6 name=devDescribe placeholder=\"Describe the deviation (Required)\" ng-model=vm.deviation.dvDescribe required></textarea></div></div><div class=form-group><label class=\"col-md-2 control-label\">Date of Deviation:</label><div class=col-sm-2><dv-date-picker dp-date=vm.deviation.dvDate></dv-date-picker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=devCust>Customer:</label><div class=col-sm-4><input class=form-control id=devCust type=text name=devCust required ng-minlength=3 maxlength=51 placeholder=\"Enter Customer Name ( Required, Min 5 characters )\" ng-model=vm.deviation.dvCust></div><div class=col-sm-7></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=devSupplier>Supply / Manufacturer</label><div class=col-sm-4><input class=form-control id=devSupplier type=text name=devSupplier required ng-minlength=3 maxlength=51 placeholder=\"Supplier / Manufacturer ( Required, Min 5 characters )\" ng-model=vm.deviation.dvSupplier></div><div class=col-sm-7></div></div><div class=form-group><div style=padding-right:1.2em class=pull-right><button type=submit ng-show=vm.new ng-disabled=devDetailsForm.$invalid ng-click=\"vm.save(vm.deviation, devDetailsForm, \'Deviation created by :\')\" class=\"btn btn-primary\">Create</button> <button type=submit ng-disabled=\"devDetailsForm.$invalid || !vm.qaRole && vm.locked\" ng-click=\"vm.save(vm.deviation, devDetailsForm, \'Deviation edited by : \')\" class=\"btn btn-primary\" ng-hide=vm.new>Save Edit</button> <button type=button ng-click=vm.cancelEdit() class=\"btn btn-default\">Cancel</button></div></div></fieldset></form>");
$templateCache.put("/app/deviations/devEditView.html","<h3 ng-hide=vm.new>Deviation - {{vm._dvNo}}</h3><h3 ng-show=vm.new>New Deviation</h3><div ng-hide=vm.new class=pull-right><button type=submit ng-click=\"vm.save(vm.deviation, \'\', \'closed\')\" ng-show=vm.qaRole class=\"btn btn-warning\">Close Deviation</button> <button type=button ng-click=vm.dvPrint() class=\"btn btn-info\">Print Deviation</button></div><div class=wizard><a ui-sref=.detail ui-sref-active=active>Details</a> <a ui-sref=.invest ui-sref-active=active ng-hide=vm.new>Investigation</a> <a ui-sref=.log ui-sref-active=active ng-hide=vm.new>Logs</a> <a ui-sref=.tasks ui-sref-active=active ng-hide=vm.new>Tasks ({{vm.taskcount}})</a> <a ui-sref=.files ui-sref-active=active ng-hide=vm.new>Files</a></div><div ui-view></div>");
$templateCache.put("/app/deviations/devFileView.html","<dp-files></dp-files>");
$templateCache.put("/app/deviations/devInvestView.html","<form name=devDetailsForm class=\"form-horizontal well dv-well\"><fieldset><legend></legend><div class=form-group><label for=devAssign class=\"col-sm-2 label-control\">Assigned To:</label><div class=col-sm-3><select class=form-control id=devAssign ng-model=vm.dvUser ng-options=\"user for user in vm.users\"></select></div><div class=col-sm-7></div></div><div class=form-group><label for=devInvest class=\"col-sm-2 label-control\">Investigation:</label><div class=col-sm-10><textarea class=form-control id=devInvest rows=10 placeholder=\"What caused the deviation?\" ng-model=vm.deviation.dvInvest></textarea></div></div><div class=form-group><label for=devOutcomes class=\"col-sm-2 label-control\">Outcome:</label><div class=col-sm-2><select class=form-control id=devOutcomes type=text ng-model=vm.deviation.dvOutCome ng-options=\"obj for obj in vm.dvOutcome\"></select></div><div class=com-sm-8></div></div><div class=form-group><label class=\"col-md-2 control-label\">Date sent to Customer:</label><div class=col-sm-2><dv-date-picker dp-date=vm.deviation.dvCustSend></dv-date-picker></div></div><div class=form-group><label for=devCat class=\"col-sm-2 label-control\">Category</label><div class=col-sm-3><select class=form-control id=devCat type=text ng-model=vm.deviation.dvCat ng-options=\"obj for obj in vm.Cat\"></select></div><div class=com-sm-7></div></div><div class=form-group><label for=devClass class=\"col-sm-2 label-control\">Classification</label><div class=col-sm-3><select class=form-control id=devClass type=text ng-model=vm.deviation.dvClass ng-options=\"obj for obj in vm.Class\"></select></div><div class=com-sm-7></div></div><div style=padding-right:1.2em class=pull-right><button type=submit ng-disabled=\"devDetailsForm.$invalid || !vm.qaRole && vm.locked\" ng-click=\"vm.save(vm.deviation, devDetailsForm, \'Deviation edited by : \')\" class=\"btn btn-primary\">Save Edit</button> <button type=button ng-click=vm.cancelEdit() class=\"btn btn-default\">Cancel</button></div></fieldset></form>");
$templateCache.put("/app/deviations/devListView.html","<section class=padding-left-right-med><div class=row><div class=col-sm-8><h3 class=\"project-titleH2 col-md-8\">Deviation List ({{vm.totalItems}})</h3></div><div class=\"col-sm-4 search\"><dv-list-search query=vm.queryProject dvplace=\"Search Deviation\" page=vm.setPagPage()></dv-list-search></div></div><div class=\"row pull-right\"><div class=\"radio-inline handPointer\"><label><input type=radio name=optDeviation checked ng-model=vm.status ng-change=vm.loadActive()>Show Active Deviations</label></div><div class=\"radio-inline handPointer\"><label><input type=radio name=optDeviation value ng-model=vm.status ng-change=vm.loadAll()>Show All Deviations</label></div></div><div class=row><table class=\"table table-hover\"><thead><tr class=dv-fmc-background><th>Dev #</th><th>Item Id</th><th>Item Description</th><th>Customer</th><th>Days</th><th>Assigned</th></tr></thead><tbody><tr ng-repeat=\"dev in vm.filtered = (vm.deviation | filter:vm.queryProject) | startFrom:(vm.currentPage-1)*vm.numPerPage | limitTo:vm.numPerPage\" ng-click=vm.getDeviation(dev.dvNo) class=\"handPointer clickspan projTab\"><td>{{dev.dvNo}}</td><td>{{dev.dvMatNo}}</td><td>{{dev.dvMatName}}</td><td>{{dev.dvCust}}</td><td>{{dev.dvLog | dvDayNumber: dev.dvClosed}}</td><td>{{dev.dvAssign}}</td></tr></tbody></table></div><pagination total-items=vm.totalItems ng-model=vm.currentPage items-per-page=vm.numPerPage class=\"pagination-sm handPointer pull-right\"></pagination><div class=\"addDeviationButton pull-left\"><button type=button ng-click=vm.openNewDeviation() class=\"btn btn-success\">Add New Deviation</button></div></section>");
$templateCache.put("/app/deviations/devLogView.html","<form name=devDetailsForm class=\"form-horizontal well dv-well\"><fieldset><legend>Deviation Audit Trail</legend></fieldset><div style=\"padding-left:20px; padding-right:20px\" class=list-group><div ng-repeat=\"obj in vm.deviation.dvLog\" class=dpwell><p><span class=\"glyphicon glyphicon-edit\"></span><strong></strong>{{obj.dvLogType}}<small><em>{{obj.dvLogBy}} on the {{obj.dvLogDate | date : \"dd/MM/yyyy\"}} at {{obj.dvLogDate | date : \"h:mm a\"}}</em></small></p></div></div></form>");
$templateCache.put("/app/deviations/devPrintView.html","<div class=\"container container-fluid report-body\"><div class=row><div><img src=./images/cheminova_logo.png class=Chemlogo></div></div><hr><div class=\"row report-header\"><div class=col-xs-12><div class=col-xs-6><div>Investigation Report</div></div><div class=\"col-xs-6 dpRightCol\"><div>{{vm.deviation.dvNo}}</div></div></div></div><div class=row><div class=col-xs-12><div class=col-xs-6><strong>Material No :</strong> {{vm.deviation.dvMatNo}}</div><div class=col-xs-6><strong>Assigned To :</strong> {{vm.deviation.dvAssign}}</div></div></div><div class=row><div class=col-xs-12><strong>Material Name :</strong> {{vm.deviation.dvMatName}}</div></div><div class=row><div class=col-xs-12><div class=col-xs-6><strong>Batch # :</strong> {{vm.deviation.dvBatchNo}}</div><div class=col-xs-6><strong>DOM:</strong> {{vm.deviation.dvDOM | date : \'dd/MM/yyyy\'}}</div></div></div><div class=row><div class=col-xs-12><div class=col-xs-6><strong>Customer :</strong> {{vm.deviation.dvCust}}</div><div class=col-xs-6><strong>Supplier :</strong> {{vm.deviation.dvSupplier}}</div></div></div><div class=row><div class=col-xs-12><div class=col-xs-6><strong>Outcome :</strong> {{vm.deviation.dvOutCome}}</div><div class=col-xs-6><strong>Category :</strong> {{vm.deviation.dvCat}}</div></div></div><hr><div class=row><div class=dpheading><b>Describe the Deviation</b></div><div class=report-paragraph>{{vm.deviation.dvDescribe}}</div></div><div class=row><div class=dpheading><b>Investigation</b></div><div class=report-paragraph>{{vm.deviation.dvInvest}}</div></div></div><div class=\"container container-fluid page-break\"><div class=row><img src=./css/img/cheminova_logo.png class=Chemlogo></div><div class=row><div class=h4>Deviation Task and CAPA Actions</div></div><div class=row><ul ng-repeat=\"t in vm.tasks\"><li><div><span>{{$index+1}}.</span> {{t.TKName}}</div><div class=dptask-text><div>Target Date : {{t.TKTarg | date : \"dd/MM/yyyy\"}}<span ng-show=\"\'{{t.TKStat}}\' == 5\">- Date Completed: {{t.TKComp | date : \"dd/MM/yyyy\"}}</span></div><div>Assigned To : {{t.TKChamp}}</div></div></li></ul></div></div>");
$templateCache.put("/app/deviations/dvListSearchView.html","<div class=row><div class=input-group><input type=text ng-model=query ng-change=page() placeholder={{dvplace}} class=form-control><span class=\"input-group-addon glyphicon glyphicon-search\"></span></div></div>");
$templateCache.put("/app/files/dpFiles.html","<section class=padding-left-right-med><div class=row><h3 class=\"project-titleH2 col-md-8\">Files</h3></div><div class=row><div class=col-sm-8><table class=table><thead><tr><th>Type</th><th>File Name</th><th>Uploaded By</th><th>Date</th><th>Actions</th></tr></thead><tbody><tr ng-repeat=\"dpfile in ctr.fstext\"><td><img change-ext=change-ext ext=dpfile.fsFileExt src class=\"icon-img pull-right\"></td><td>{{dpfile.fsFileName}}</td><td>{{dpfile.fsAddedBy}}</td><td>{{dpfile.fsAddedAt | date : \"dd/MM/yyyy\"}}</td><td><button type=button ng-click=\"ctr.downloadfile(dpfile.fsFileName + \'.\' + dpfile.fsFileExt)\" class=\"btn btn-info btn-xs pull-right\"><span class=\"glyphicon glyphicon-circle-arrow-down\"></span>Download</button></td><td><button type=button ng-click=\"ctr.deletefile(dpfile.fsFileName + \'.\' + dpfile.fsFileExt)\" class=\"btn btn-danger btn-xs pull-right\"><span class=\"glyphicon glyphicon-trash\"></span>Remove</button></td></tr></tbody></table></div><div class=col-sm-4><div class=form-group><div><label class=custom-file-upload><input type=file nv-file-select=nv-file-select uploader=ctr.uploader>Custom Upload</label><h4 class=well>Files Selected</h4><ul ng-repeat=\"item in ctr.uploader.queue\" class=list-group><li class=list-group-item>{{ item.file.name }} <button type=button ng-click=item.upload() ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\" class=\"btn btn-success btn-xs pull-right\"><span class=\"glyphicon glyphicon-upload\"></span> Upload</button></li></ul></div></div></div></div></section>");
$templateCache.put("/app/main/main.html","<h1>Deviation Dashboard</h1><div class=\"row graphs-page\"><div class=col-md-7><canvas id=pie class=\"chart chart-pie\" data=cData legend=true labels=cLabels width=200 height=200></canvas></div><div class=col-md-5><canvas id=bar class=\"chart chart-bar\" data=data labels=labels legend=true series=series colours=bColors></canvas></div></div><div class=\"row graphs-page\"><div class=col-md-6><h4>Deviations closed with 30 days</h4><table class=landing><tr><td class=dpCol1>Deviation completed in 30 days</td><td class=dpCol2>{{vm.summary.devClosed1}}</td></tr><tr><td>Deviation &gt; 30 and &lt; 60 days</td><td class=dpCol2>{{vm.summary.devClosed2}}</td></tr><tr><td>Deviation &gt; 60 days</td><td class=dpCol2>{{vm.summary.devClosed3}}</td></tr></table></div><div class=col-md-6><h4>Open CAPA and tasks</h4><table class=landing><tr><td class=dpCol1>Number of Open CAPA</td><td class=dpCol2>{{vm.summary.capa1}}</td></tr><tr><td>Number of active tasks (includes CAPA)</td><td class=dpCol2>{{vm.summary.capa2}}</td></tr></table></div></div>");
$templateCache.put("/app/tasks/task-detail.html","<h4 class=col-lg-offset-1>Task Detail - {{vm.dvNo}}</h4><form name=taskedit role=form novalidate class=form-horizontal><div ng-hide=false ng-model=vm.task.dvNo></div><div class=form-group ng-class=\"{\'has-error\': taskedit.TKName.$invalid && taskedit.TKName.$dirty }\"><label class=\"col-sm-2 control-label\" for=TKName>Task Action:</label><div class=col-sm-8><input class=form-control id=TKName type=text required name=TKName placeholder=\"Enter the project title (Required)\" ng-model=vm.task.TKName maxlength=86></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Target Date:</label><div class=col-sm-3><dv-date-picker dp-date=vm.task.TKTarg></dv-date-picker></div></div><div class=form-group><label class=\"col-sm-2 control-label\">Date Completed:</label><div class=col-sm-3><dv-date-picker id=TKComp dp-date=vm.task.TKComp></dv-date-picker></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=TKChamp>Task Owner :</label><div class=col-sm-8><select class=form-control id=TKChamp type=text required name=TKChamp ng-model=vm.dvUser ng-options=\"c for c in vm.users\"></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=TKStat>Status:</label><div class=col-sm-8><select class=form-control id=TKStat type=text ng-init=\"vm.task.TKStat = vm.stats[0].value\" required name=TKStat ng-model=vm.task.TKStat ng-options=\"obj.value as obj.text for obj in vm.stats\"></select></div></div><div class=form-group><div class=\"col-sm-offset-2 col-sm-10\"><div class=checkbox><label><input id=inlineCheckbox2 type=checkbox ng-true-value=1 ng-false-value=0 ng-model=vm.task.TKCapa>Preventative Action</label></div></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=TKComment>Comment:</label><div class=col-sm-9><textarea id=TKComment rows=6 type=text placeholder=\"Enter a comment about the task\" class=form-control ng-model=vm.task.TKComment></textarea></div></div><div class=form-group><div style=padding-right:4em class=pull-right><button type=submit ng-click=\"vm.saveTask(vm.task, taskedit)\" class=\"btn btn-primary\">Save</button> <button type=button ng-click=vm.cancel() class=\"btn btn-default\">Cancel</button> <button type=button ng-click=vm.deleteTask() class=\"btn btn-danger\">Delete</button></div></div></form>");
$templateCache.put("/app/tasks/task-list.html","<section><div ng-hide=vm.dpShowButton><div class=\"col-sm-6 pull-right search\"><dv-list-search query=vm.queryTask dvplace=\"Search Tasks\" page=vm.setPagPage()></dv-list-search></div><div class=\"well col-lg-6\"><div class=\"checkbox-inline col-sm-5\"><label><input type=checkbox id=activeonly ng-model=vm.activeonly>Show only Active Tasks</label></div><div class=\"checkbox-inline col-sm-5\"><label><input type=checkbox id=capaonly ng-model=vm.capaonly>Show Only CAPA</label></div><div class=col-sm-1><btn ng-click=vm.loadAll() class=\"btn btn-primary\">Filter</btn></div></div></div><table class=\"table task-table\"><thead><tr class=dv-fmc-background><th>Project Id</th><th>Task Action</th><th>Target Date</th><th>Completed</th><th>Champion</th><th>Status</th></tr></thead><tbody><tr ng-repeat=\"t in vm.filtered = (vm.tasks | filter: vm.queryTask) | startFrom:(vm.currentPage-1)*vm.numPerPage | limitTo:vm.numPerPage\" ng-click=vm.openTask(t) class=dvTable><td>{{t.DevId}}</td><td>{{t.TKName}}</td><td>{{t.TKTarg | date : \"dd/MM/yyyy\"}}</td><td>{{t.TKComp | date : \"dd/MM/yyyy\"}}</td><td>{{t.TKChamp}}</td><td><img change-status=change-status status=t.TKStat src></td><td ng-hide=true ng-model=t.DevId></td></tr></tbody></table><div class=\"input-group search pull-right col-md-2\"><pagination total-items=vm.totalItems ng-model=vm.currentPage items-per-page=vm.numPerPage class=\"pagination-sm handPointer\"></pagination></div><div ng-show=vm.dpShowButton class=\"addTaskButton pull-left\"><button type=button ng-click=\"vm.openTask(\'new\')\" class=\"btn btn-success\">Add Task</button></div></section>");}]);