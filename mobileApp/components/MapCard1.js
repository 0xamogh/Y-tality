import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import {MapView} from 'react-native-maps'
import * as shape from 'd3-shape'


import { argonTheme } from '../constants';


class MapCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80] };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ data: [50, 35, 53, -53, 24, 50, -20, -80, 10, 40, 95, -4, -24, 85, 91] }), 5000);

    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    onRegionChange(region) {
        this.setState({ region });
    }

    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    render() {

        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const data2 = [50, 35, 53, -53, 24, 50, -20, -80, 10, 40, 95, -4, -24, 85, 91]


        const { navigation, horizontal, full, style, imageStyle } = this.props;

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
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro')}>


                    {/* <Block > */}
                        {/* <Image source={{ uri: item.image }} style={imageStyles} /> */}
                        <MapView
                    //         style = {styles.MapViewStyle}
                    //         region= {{
                    //         latitude: 37.78825,
                    //     longitude: -122.4324,
                    //     latitudeDelta: 0.0922,
                    //     longitudeDelta: 0.0421,
                    // }}
                            // onRegionChange={this.onRegionChange}
                        />
                            
                    {/* </Block> */}
                </TouchableWithoutFeedback>
               
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
    }, MapViewStyle: {
        flex: 1,
        height: 215,
        width: 215

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