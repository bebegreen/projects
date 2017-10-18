(function () {

    angular
        .module('jobsPortal')
        .service('mapService', ['$rootScope', mapService])

    /** @ngInject */
    function mapService($rootScope) {
        let map;

        this.drawMap = () => {
            let center = {
                lat: 32.057918,
                lng: 34.787779
            };

            let element = document.getElementById('map');
            map = new google.maps.Map(element, {
                zoom: 11,
                center: center
            })
        }

        let marks = [];
        this.drawMarkers = (jobs, userCoords) => {

            var latLng = new google.maps.LatLng(userCoords[1], userCoords[0]);
            map.panTo(latLng);

            let home = new google.maps.Marker({
                position: latLng, 
                map: map, 
                icon: 'http://www.pirates-paradise.fr/themes/default/homemobile.png'
            })

            for (job of jobs) {
                let pos = {
                    lat: job.coordinates[1],
                    lng: job.coordinates[0]
                }
                let marker = new google.maps.Marker({
                    position: pos,
                    map: map
                })
                marks.push(marker);
                this.registerListener(marker, job.title, job.company);
            }

        }

        this.registerListener = (mark, title, company) => {
            var infowindow = new google.maps.InfoWindow({
                content: '<strong>' + title + '</strong> - ' + company
            });

            mark.addListener('mouseover', function () {
                infowindow.open(mark.get('map'), mark);
            });
            mark.addListener('mouseout', function () {
                infowindow.close(mark.get('map'), mark);
            });

        }
        this.removeMarks = () => {
            marks.forEach((mark) => {
                mark.setMap(null);
            })
        }

    }

}());





