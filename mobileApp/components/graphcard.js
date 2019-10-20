import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


import { argonTheme } from '../constants';


class Gcard extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ 
            read: 0,
            data: props.data,
            prediction: props.prediction,
            reading: props.reading, 
        };
    }
    
    componentDidMount () {
        this.interval = setInterval( () => this.setState((state) => {
            let value;
            if (state.read == 1500 ) {
                value = 0;
            } else {
                value = state.read + 5;
            }
            return { read: value }
        }), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }
    
    render() {
        
        
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
                    {this.props.reading} Data
                </Text>
                <TouchableWithoutFeedback>
                    

                    <Block flex style={imgContainer}>
                        {/* <Image source={{ uri: item.image }} style={imageStyles} /> */}
                        <AreaChart
                            style={{ height: 200 }}
                            data={this.props.data.splice(this.state.read, this.state.read + 10)}
                            contentInset={{ top: 30, bottom: 30 }}
                            curve={shape.curveNatural}
                            svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                            animate = {true}
                            animationDuration = {200}
                            >
                            <Grid />
                        </AreaChart>
                    </Block>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Text h2 style={styles.cardProb}>
                        {/* {item.title} */}
                        {this.props.prediction}
                        </Text>
                    </Block>
                </TouchableWithoutFeedback>
            </Block>
        );
    }
}

Gcard.propTypes = {
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
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 10
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
        borderRadius :3
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

export default withNavigation(Gcard);