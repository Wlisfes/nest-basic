<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonScreen',
    props: {
        poster: {
            type: String,
            default: `https://cloud.lisfes.cn/408bbeb02faa71eebfec0764a3fc0102/snapshots/46296c084d9e49abb290535d55a4d8c1-00001.jpg?auth_key=1691915914-dc64d0fbdd0e404c943bbcdadca0dde1-0-377318417ade326e473794259bfc493a`
        },
        src: {
            type: String,
            default: `https://cloud.lisfes.cn/408bbeb02faa71eebfec0764a3fc0102/676e81945648f99f557ee7bab65fec2e-4k.mp4?auth_key=1691915915-31ef5f8bcb274216bb60009def624971-0-7045c58c83c0bbac9da88302f85a88d3`
        }
    },
    setup(props) {
        return () => (
            <n-el class="common-screen" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <video
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={props.src}
                    poster={props.poster}
                    autoplay
                    loop
                    muted
                ></video>
            </n-el>
        )
    }
})
</script>
