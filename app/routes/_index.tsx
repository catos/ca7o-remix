import { Button } from "~/components/ui/button"
import { Popover } from "~/components/ui/popover"

export default function Index() {
    return (
        <>
            <section className="mb-6">
                <Popover>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc leo enim, commodo non rutrum at, rhoncus id sapien. Sed
                    lobortis justo dui, id semper diam scelerisque et. Cras eu
                    nulla at risus sodales semper. Nunc lorem eros, suscipit id
                    iaculis finibus, pellentesque vel dolor. Nullam vulputate
                    velit nec euismod aliquet. Curabitur sed rutrum nibh, vitae
                    accumsan augue. Maecenas nec porta est, vitae vulputate
                    tortor. Vivamus blandit libero leo, sit amet condimentum
                    risus aliquet ac. Pellentesque eu sem vitae metus euismod
                    porta a id tortor. Nulla ac nulla nunc. Nam placerat erat
                    nec lectus accumsan mattis. Suspendisse sapien lorem,
                    malesuada vel tortor vitae, pretium pharetra metus.
                </Popover>
            </section>
            <section className="mb-6">
                <Popover toggler={<Button>Toggler as parameter</Button>}>
                    Nulla facilisi. Proin odio velit, porta sed tincidunt sed,
                    vehicula sit amet ipsum. Aliquam eget eleifend arcu. Aliquam
                    interdum justo sodales pretium scelerisque. Quisque massa
                    dolor, lobortis at cursus ac, dictum sit amet erat. Sed
                    pulvinar erat nec nibh sagittis, at interdum nisl volutpat.
                    Suspendisse interdum molestie tempus. Ut dapibus, mauris non
                    luctus iaculis, lectus odio porttitor purus, sit amet
                    pretium mauris nibh sed ante. Pellentesque euismod nibh
                    mauris, et blandit augue convallis in. Nullam feugiat, nunc
                    a aliquam ultrices, nibh velit consectetur lorem, in
                    bibendum nisi nisi et ligula. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Aenean sit amet arcu sem. Nunc consequat leo eget est
                    maximus aliquet. Sed a diam vel odio dictum euismod. In
                    cursus quam nec leo placerat, eu vulputate nulla vestibulum.
                    Suspendisse et lorem blandit dui mollis bibendum quis a leo.
                </Popover>
            </section>
            <section className="mb-6">
                Mauris sit <Button variant="link">link button</Button> dui sed
                est gravida cursus vitae hendrerit sapien. Curabitur eu mauris
                eu libero fermentum condimentum vel quis tortor. Suspendisse
                tincidunt volutpat quam vel eleifend. Etiam eget eros felis.
                Aenean faucibus sem non massa ultrices, non varius metus
                ultrices. Cras dui erat, molestie at risus tempor, consectetur
                fermentum tellus. Aenean quis sollicitudin lacus. Donec bibendum
                ipsum a massa porta, sed porta nunc rhoncus.
            </section>
            <section className="mb-6">
                Curabitur ac ligula gravida, egestas nisi a, efficitur ipsum.
                Nam tempor erat eu dolor finibus rutrum. Donec nisl lectus,
                finibus ut velit eu, tincidunt laoreet augue. Vivamus fringilla
                elementum tellus, vitae ullamcorper sem ultrices et. Nullam
                scelerisque auctor massa, ut varius orci imperdiet at. Nunc
                tristique molestie sem eget malesuada. Quisque bibendum turpis
                ac nisi hendrerit, vel pellentesque dolor ullamcorper. Sed
                molestie nibh erat, at porta mauris efficitur eu. Proin
                sollicitudin quis nunc quis consectetur. Sed enim odio,
                facilisis vitae facilisis vel, fermentum vitae lectus. Sed
                suscipit, turpis ut gravida suscipit, ex nisi convallis ipsum, a
                elementum sem nibh sodales dui. Maecenas mi erat, suscipit a
                nisi non, dignissim suscipit lectus. Curabitur eget arcu
                tristique, elementum sem ac, laoreet odio. Curabitur a blandit
                arcu, vel scelerisque purus. Mauris cursus magna eget nibh
                mattis, sed elementum nulla aliquet.
            </section>
            <section className="mb-6">
                Nulla facilisi. Proin odio velit, porta sed tincidunt sed,
                vehicula sit amet ipsum. Aliquam eget eleifend arcu. Aliquam
                interdum justo sodales pretium scelerisque. Quisque massa dolor,
                lobortis at cursus ac, dictum sit amet erat. Sed pulvinar erat
                nec nibh sagittis, at interdum nisl volutpat. Suspendisse
                interdum molestie tempus. Ut dapibus, mauris non luctus iaculis,
                lectus odio porttitor purus, sit amet pretium mauris nibh sed
                ante. Pellentesque euismod nibh mauris, et blandit augue
                convallis in. Nullam feugiat, nunc a aliquam ultrices, nibh
                velit consectetur lorem, in bibendum nisi nisi et ligula. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean sit amet arcu sem. Nunc consequat
                leo eget est maximus aliquet. Sed a diam vel odio dictum
                euismod. In cursus quam nec leo placerat, eu vulputate nulla
                vestibulum. Suspendisse et lorem blandit dui mollis bibendum
                quis a leo.
            </section>
            <section className="mb-6">
                Mauris sit amet dui sed est gravida cursus vitae hendrerit
                sapien. Curabitur eu mauris eu libero fermentum condimentum vel
                quis tortor. Suspendisse tincidunt volutpat quam vel eleifend.
                Etiam eget eros felis. Aenean faucibus sem non massa ultrices,
                non varius metus ultrices. Cras dui erat, molestie at risus
                tempor, consectetur fermentum tellus. Aenean quis sollicitudin
                lacus. Donec bibendum ipsum a massa porta, sed porta nunc
                rhoncus.
            </section>
            <section className="mb-6">
                Curabitur ac ligula gravida, egestas nisi a, efficitur ipsum.
                Nam tempor erat eu dolor finibus rutrum. Donec nisl lectus,
                finibus ut velit eu, tincidunt laoreet augue. Vivamus fringilla
                elementum tellus, vitae ullamcorper sem ultrices et. Nullam
                scelerisque auctor massa, ut varius orci imperdiet at. Nunc
                tristique molestie sem eget malesuada. Quisque bibendum turpis
                ac nisi hendrerit, vel pellentesque dolor ullamcorper. Sed
                molestie nibh erat, at porta mauris efficitur eu. Proin
                sollicitudin quis nunc quis consectetur. Sed enim odio,
                facilisis vitae facilisis vel, fermentum vitae lectus. Sed
                suscipit, turpis ut gravida suscipit, ex nisi convallis ipsum, a
                elementum sem nibh sodales dui. Maecenas mi erat, suscipit a
                nisi non, dignissim suscipit lectus. Curabitur eget arcu
                tristique, elementum sem ac, laoreet odio. Curabitur a blandit
                arcu, vel scelerisque purus. Mauris cursus magna eget nibh
                mattis, sed elementum nulla aliquet.
            </section>
            <section className="mb-6">
                Nulla facilisi. Proin odio velit, porta sed tincidunt sed,
                vehicula sit amet ipsum. Aliquam eget eleifend arcu. Aliquam
                interdum justo sodales pretium scelerisque. Quisque massa dolor,
                lobortis at cursus ac, dictum sit amet erat. Sed pulvinar erat
                nec nibh sagittis, at interdum nisl volutpat. Suspendisse
                interdum molestie tempus. Ut dapibus, mauris non luctus iaculis,
                lectus odio porttitor purus, sit amet pretium mauris nibh sed
                ante. Pellentesque euismod nibh mauris, et blandit augue
                convallis in. Nullam feugiat, nunc a aliquam ultrices, nibh
                velit consectetur lorem, in bibendum nisi nisi et ligula. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean sit amet arcu sem. Nunc consequat
                leo eget est maximus aliquet. Sed a diam vel odio dictum
                euismod. In cursus quam nec leo placerat, eu vulputate nulla
                vestibulum. Suspendisse et lorem blandit dui mollis bibendum
                quis a leo.
            </section>
            <section className="mb-6">
                Mauris sit amet dui sed est gravida cursus vitae hendrerit
                sapien. Curabitur eu mauris eu libero fermentum condimentum vel
                quis tortor. Suspendisse tincidunt volutpat quam vel eleifend.
                Etiam eget eros felis. Aenean faucibus sem non massa ultrices,
                non varius metus ultrices. Cras dui erat, molestie at risus
                tempor, consectetur fermentum tellus. Aenean quis sollicitudin
                lacus. Donec bibendum ipsum a massa porta, sed porta nunc
                rhoncus.
            </section>
            <section className="mb-6">
                Curabitur ac ligula gravida, egestas nisi a, efficitur ipsum.
                Nam tempor erat eu dolor finibus rutrum. Donec nisl lectus,
                finibus ut velit eu, tincidunt laoreet augue. Vivamus fringilla
                elementum tellus, vitae ullamcorper sem ultrices et. Nullam
                scelerisque auctor massa, ut varius orci imperdiet at. Nunc
                tristique molestie sem eget malesuada. Quisque bibendum turpis
                ac nisi hendrerit, vel pellentesque dolor ullamcorper. Sed
                molestie nibh erat, at porta mauris efficitur eu. Proin
                sollicitudin quis nunc quis consectetur. Sed enim odio,
                facilisis vitae facilisis vel, fermentum vitae lectus. Sed
                suscipit, turpis ut gravida suscipit, ex nisi convallis ipsum, a
                elementum sem nibh sodales dui. Maecenas mi erat, suscipit a
                nisi non, dignissim suscipit lectus. Curabitur eget arcu
                tristique, elementum sem ac, laoreet odio. Curabitur a blandit
                arcu, vel scelerisque purus. Mauris cursus magna eget nibh
                mattis, sed elementum nulla aliquet.
            </section>
        </>
    )
}
