import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'
import StaticMap from '../components/staticmap'
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


import { argonTheme } from '../constants';


class MapCard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 12.891854,
                longitude: 77.585204,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            } };
    }

    // componentDidMount() {
    //     this.state={
    //         region: {
    //             latitude: 37.78825,
    //             longitude: -122.4324,
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         }

    //     }

    // }
    componentWillUnmount() {
        // clearInterval(this.interval)
    }

    render(props) {


        const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;

        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle
        ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [styles.imageContainer,
        horizontal ? styles.horizontalStyles : styles.verticalStyles,
        styles.shadow
        ];


        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <Text h3 >
                    {/* {item.cta} */}
                    Patient Location
                    </Text>
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('')}> */}


                    <Block flex style={imgContainer}>
                        {/* <Image source={{ uri: item.image }} style={imageStyles} /> */}

                        <MapView
                        provider={this.props.provider}
                        style={styles.MapViewStyle}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        initialRegion={this.state.region}

                        >
                        <Marker
                            title="This is a title"
                            description="This is a description"
                            coordinate={this.state.region}
                                />
                        
                        </MapView>
                    </Block>
                {/* </TouchableWithoutFeedback> */}
            </Block>
        );
    }
}

MapCard.propTypes = {
    item: PropTypes.object,
    horizontal: PropTypes.bool,
    full: PropTypes.bool,
    ctaColor: PropTypes.string,
    imageStyle: PropTypes.any,
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
        marginBottom: 16
    },
    MapViewStyle : {
        flex: 1,
        height: 215,
        width :'auto'

    },
    cardProb: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 6
    },
    cardDescription: {
        padding: theme.SIZES.BASE / 2
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: 'hidden',
        borderRadius: 3
    },
    image: {
        // borderRadius: 3,
    },
    horizontalImage: {
        height: 122,
        width: 'auto',
    },
    horizontalStyles: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    verticalStyles: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    fullImage: {
        height: 215
    },
    shadow: {
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
});

export default withNavigation(MapCard);