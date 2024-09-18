import { StyleSheet } from 'react-native'
import Maplibre from '@maplibre/maplibre-react-native'
import { Asset } from 'expo-asset'
import { useEffect, useState } from 'react'
import mapStyleJson from '@/assets/map/style.json'

type InnerProps = {
  mapUrl: string
  mapStyle: string
}

function InnerIndex({ mapUrl, mapStyle }: InnerProps) {
  return (
    <Maplibre.MapView style={s.mapView} styleJSON={mapStyle}>
      <Maplibre.Camera
        defaultSettings={{
          // remember to put coordinates that match your map, or you will see nothing
          centerCoordinate: [-58.4, -34.57],
          zoomLevel: 11.5,
        }}
      />
      <Maplibre.VectorSource id="main" url={mapUrl}>
        <Maplibre.LineLayer
          id="lines"
          sourceLayerID="transportation"
          style={layerStyles.transportation}
        />
      </Maplibre.VectorSource>
    </Maplibre.MapView>
  )
}

export default function Index() {
  const [mapUrl, setMapUrl] = useState<string | undefined>()
  const [mapStyle, setMapStyle] = useState<string | undefined>()

  useEffect(() => {
    const f = async () => {
      // get the mbtiles asset URI and parse it's address to a mbtiles URI
      const [{ localUri }] = await Asset.loadAsync(
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('@/assets/map/map.mbtiles'),
      )
      const uri = localUri?.replace('file:///', 'mbtiles:///')
      if (uri) {
        setMapUrl(uri)
        // replace the style's source url for the mbtiles asset URI
        const styleString = JSON.stringify(mapStyleJson).replace(
          '___FILE_URI___',
          uri,
        )
        setMapStyle(styleString)
      }
    }
    f()
  }, [])

  if (!mapUrl || !mapStyle) {
    return null
  }

  return <InnerIndex mapUrl={mapUrl} mapStyle={mapStyle} />
}

const layerStyles = {
  transportation: {
    lineWidth: 0,
  },
}

const s = StyleSheet.create({
  mapView: {
    height: '100%',
    width: '100%',
  },
})
