import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme, Icon } from 'galio-framework';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


import { argonTheme } from '../constants';


class Pulse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    onRegionChange(region) {
        this.setState({ region: region });
    }
    onRegionChangeComplete(region) {
        console.log(this)
        console.log(this.setState)

        this.setState({ region: region });

    }

    render() {

        const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;

        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle
        ];
        const cardContainer = [styles.card, styles.shadow, {justifyContent: 'space-evenly',flexDirection:'row',alignItems:'center' }];
        const imgContainer = [styles.imageContainer,
        horizontal ? styles.horizontalStyles : styles.verticalStyles,
        styles.shadow
        ];


        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <Icon name="heart-outlined" family="Entypo" color={theme.COLORS.RED} size={50} />

                <Text h4 bold >
                    {/* {item.cta} */}
                
                    You look healthy :)
                    </Text>
                {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('')}> */}


                </Block>
            
        );
    }
}

Pulse.propTypes = {
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
    MapViewStyle: {
        flex: 1,
        height: 215,
        width: 'auto'

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

export default withNavigation(Pulse);