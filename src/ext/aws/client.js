var Promise = require('bluebird');
var AWS     = require('aws-sdk');
var config  = require('./../../../config');

AWS.config.region = config.api.aws.region;

var ec2            = new AWS.EC2();
var cloudFormation = new AWS.CloudFormation();

module.exports = {
    stacks: function () {
        var def = Promise.defer();

        cloudFormation.describeStacks({}, function (err, data) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(data.Stacks);
            }
        });

        return def.promise;
    },

    instances: function () {
        var def             = Promise.defer();
        var amis            = [];
        var vpcsInstanceIds = {};
        var instances       = [];

        ec2.describeInstances({}, function (err, data) {
            if (err) {
                def.reject(err);
            } else {
                data.Reservations.forEach(function (reservation) {
                    reservation.Instances.forEach(function (instanceData) {
						
                        var instance = {
                            id:               instanceData.InstanceId,
                            state:            instanceData.State.Name,
                            type:             instanceData.InstanceType,
                            privateIpAddress: instanceData.PrivateIpAddress,
                            publicIpAddress:  instanceData.PublicIpAddress || null,
                            vpc:              instanceData.VpcId,
                            loadBalancers:    [],
                            securityGroups:   [],
							image: 			  instanceData.ImageId,
							subnet: 		  instanceData.SubnetId	
                        };

                        instanceData.SecurityGroups.forEach(function (sg) {
                            instance.securityGroups.push(sg.GroupId);
                        });

                        instance.tags = {};
                        instanceData.Tags.forEach(function (tag) {
                            instance.tags[tag.Key.toLowerCase()] = tag.Value;
                        });

                        instance.name = instance.tags.name || null;

                        instances.push(instance);

                        amis.push(instanceData.ImageId);

                        if (typeof instance.vpc != 'undefined') {
                            if (!vpcsInstanceIds[instance.vpc]) {
                                vpcsInstanceIds[instance.vpc] = [];
                            }
                            vpcsInstanceIds[instance.vpc].push(instance.id);
                        }
                    });
                });

                def.resolve(instances);
            }
        });

        return def.promise;
    }
};