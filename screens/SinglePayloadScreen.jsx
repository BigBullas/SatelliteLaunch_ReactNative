import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetPayload, setPayload } from '../store/payloadSlice';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { axiosInstance } from '../api';
import Breadcrumbs from '../components/Breadcrumbs';
import defaultImage from '../assets/default_image.jpg'
import { Link } from '@react-navigation/native';


export default function SinglePayloadScreen({route}) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { payload } = useSelector((store) => store.payload);

    useEffect(() => {
        async function getPayloadById() {
            await axiosInstance.get(`/payloads/${id}`)
            .then((response) => {
                console.log("Singlepayload: ", response?.data?.payload)
                dispatch(setPayload(response?.data?.payload));
            })
            .catch((err) => console.log(err))
        }
        getPayloadById();
    }, [dispatch]);

    return (
    <ScrollView>
        <View style={styles.page}>
                <View style={styles.bcContainer}>
                    <Breadcrumbs page={ payload }/>
                </View>
            {payload != null && payload.title != "" && payload.img_url != undefined &&
            <View style={{margin: 15}}>
                <View>
                    <Image style={styles.image}  source={payload.img_url ? { uri: payload.img_url} : defaultImage}/>
                    <View>
                        <Text style={styles.textTitle}>{payload.title}</Text>
                        <Text style={styles.text}> {payload.description}</Text>
                        <View>
                            <Text style={styles.text}>
                                Вес: {payload.load_capacity} т
                            </Text>
                            <Text style={styles.text}>
                                Планируемая дата полёта: {payload.flight_date_start} - {payload.flight_date_end}
                            </Text>
                            <Text style={styles.text}>
                                Желаемая цена услуги: {payload.desired_price} млн рублей
                            </Text>
                            <Text style={styles.detailedDesc}>
                                Описание: {payload.detailed_desc}
                            </Text>
                        </View>
                    </View>
                </View>
            </View> }
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECE9F2',
    },
    text: { fontSize: 16 },
    detailedDesc: {
        fontSize: 16,
        paddingTop: 10,
    },
    textTitle: { fontSize: 18 , marginTop: 10, marginBottom: 10},
    breadcrumb: { fontSize: 16, display: 'flex', marginTop: 10},
    bcContainer: {
       flexDirection: 'row',
       alignItems: 'center', // выравнивает элементы по центру по вертикали
     },
    image: { height: 320, alignSelf: 'stretch' },
});