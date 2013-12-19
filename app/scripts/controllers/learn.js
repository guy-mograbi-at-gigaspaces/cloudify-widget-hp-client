'use strict';

angular.module('cloudifyWidgetHpClientApp')
    .controller('LearnCtrl', function ( $scope ) {
        setInterval(function(){$('#learnIframeContainer').scrollTop(550);}, 1000);


        $scope.learnSteps = [
            {
                'title':'recipe creation',
                'p1':'taking existing apps to the cloud with no code changes is easy with Cloudify. The secret is in the recipe. A Cloudify recipe is a deployment and management plan describing application automation on any cloud.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/recipe.png',
                'p2':'Cloudify recipes describe the dependencies between application tiers, the lifecycle events (install, start, configure, stop, uninstall etc) per tier and the cloud resources used by each tier. In addition, the recipe determines how to monitor, upgrade, maintain and scale your application tiers.'


            } ,{
                'title':'single-click installation',
                'p1':'The Cloudify orchestrator uses a recipe to install your application on the cloud end to end: from VM provisioning all the way to application code deployment and dynamic wiring of your application dependencies.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/singleClick.png',
                'p2':'Cloudify applies a particular cloud API through the Cloud Driver layer. The Cloud Driver creates the VMs and installs Cloudify agents on each one. From that point, Cloudify Agents are orchestrated to install and start your application according to the recipe.'
            }, {
                'title':'monitoring',
                'p1':'Cloudify doesn\'t stop working for you once the deployment is complete. Cloudify monitors your application based on any custom metrics you define. Get the most up to date performance indicators on a user friendly dashboard.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/monitoring.png',
                'p2':'Cloudify recipes allow you to define custom availability and performance probes that Cloudify Agents will invoke periodically to gather custom metrics and verify availability. Metrics are aggregated into statistics by a Cloudify server that at any given moment knows the actual topology of your application.'
            },{
                'title':'auto-healing',
                'p1':'Getting most out of the cloud means maintaining your application’s health without manual intervention. Cloudify auto-heals crashed middleware or lost VMs while automatically reconfiguring the app.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/autohealing.png',
                'p2':'When a Cloudify Agent detects a hung or crashed application tier, it will immediately auto-heal it using the appropriate section in the recipe. The same applies for a lost VM detected by the Orchestrator.'
            },{
                'title':'upgrading',
                'p1':'Cloudify supports post-deployment upgrades and fine-tuning via recipe custom commands. Custom commands can be invoked manually or programmatically.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/upgarding.png',
                'p2':'Cloudify CLI or REST API allows you to invoke a custom command described in the recipe. For example, a custom command can define how to acquire a new version of your code and deploy it onto your middleware.'
            },{
                'title':'auto-scaling',
                'p1':'Cloudify will automatically scale your application for you (if your app has scaling capabilities) using your customized scale rules and metrics.',
                'img':'//d3a0pn6rx5g9yg.cloudfront.net/sites/default/files/cloud_new/howitworks/autoscaling.png',
                'p2':'When the Cloudify Orchestrator detects a SLA breach using the custom scaling rules, it creates additional app nodes based upon the recipe.'
            }
        ];



        $scope.showLearnStep = function( step ){
            $scope.currentStep = step;
        };

        $scope.showLearnStep( $scope.learnSteps[0]);

    });
