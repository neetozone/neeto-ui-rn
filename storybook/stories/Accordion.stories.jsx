import React, { useRef, useState } from "react";

import {
  Button,
  Container,
  Accordion,
  Typography,
  Touchable,
} from "@components";
import { theme } from "@theme";

const AccordionStories = {
  title: "Accordions",
  parameters: {
    notes: `
A component used to display an expandable list item.

![image](assets/screenshots/accordion/accordion.png)

## Usage \n

>import * as React from 'react';
>import { Container, Accordion } from '@bigbinary/neetoui-rn';
>
>export default function Main() {
>  return (
>    <Container>
>     <Accordion
>         header={() => (
>           <Container flexDirection="row" alignItems="center">
>             <Typography bg="#00BA8829" color="font.primary" p={moderateScale(1)}>
>               Open
>             </Typography>
>             <Typography px={moderateScale(2)}>Low</Typography>
>           </Container>
>         )}
>         iconProp={{
>           IconLabel: () => (
>             <Typography color="font.danger">Collapse</Typography>
>           ),
>           iconColor: theme.colors.font.danger,
>         }}
>       >
>         <Container my={moderateScale(2)} p={moderateScale(3)} bg="background.grey100" borderRadius={moderateScale(8)}>
>           <Typography color="font.primary">Body Content</Typography>
>         </Container>
>       </Accordion>
>    </Container>
>  );
> }
`,
  },
};
export default AccordionStories;

export const Accordions = () => {
  const accordionRef = useRef();
  const accordionRef2 = useRef();
  const accordionRef3 = useRef();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container>
      <Container py={2}>
        <Typography py={2}>Basic Accordion</Typography>
        <Accordion
          header={() => (
            <Typography fontSize={theme.fontSizes.xl} iconProp={{ size: 24 }}>
              Header
            </Typography>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Typography py={2}>Basic Accordion at top</Typography>
        <Accordion
          position="top"
          header={() => (
            <Typography fontSize={theme.fontSizes.xl} iconProp={{ size: 24 }}>
              Header
            </Typography>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Typography py={2}>Customized Accordion</Typography>
        <Accordion
          header={() => (
            <Container
              alignItems="center"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Container alignItems="center" flexDirection="row">
                <Typography bg="#00BA8829" color="font.primary" p={1}>
                  Open
                </Typography>
                <Typography px={2}>Low</Typography>
              </Container>
              <Typography>Oliver</Typography>
            </Container>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Typography py={2}>
          Accordion with customized icon properties
        </Typography>
        <Accordion
          header={() => (
            <Container alignItems="center" flexDirection="row">
              <Typography bg="#00BA8829" color="font.primary" p={1}>
                Open
              </Typography>
              <Typography px={2}>Low</Typography>
            </Container>
          )}
          iconProp={{
            Label: () => <Typography color="font.danger">Collapse</Typography>,
            color: theme.colors.font.danger,
          }}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Typography py={2}>Accordion with no border and header</Typography>
        <Accordion
          noBorder
          iconProp={{
            Label: () => <Typography color="font.danger">Collapse</Typography>,
            color: theme.colors.font.danger,
          }}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Typography py={2}>Accordion label based on state</Typography>
        <Accordion
          noBorder
          iconProp={{
            Label: () => (
              <Typography color="font.danger">
                {isExpanded ? "Collapse" : "Expand"}
              </Typography>
            ),
            color: theme.colors.font.danger,
          }}
          onStateChanged={isExpanded => setIsExpanded(isExpanded)}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Body Content</Typography>
          </Container>
        </Accordion>
      </Container>
      <Button
        label="Toggle Accordion using ref"
        onPress={() => accordionRef.current.toggleAccordion()}
      />
      <Container py={2}>
        <Accordion
          ref={accordionRef}
          header={() => (
            <Typography fontSize={theme.fontSizes.xl} iconProp={{ size: 24 }}>
              Header
            </Typography>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Accordion using ref</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container flex={1} flexDirection="row" justifyContent="space-between">
        <Button
          flex={1}
          label="Open Accordion"
          onPress={() => accordionRef2.current.openAccordion()}
        />
        <Container mx={2} />
        <Button
          flex={1}
          label="Close Accordion"
          onPress={() => accordionRef2.current.closeAccordion()}
        />
      </Container>
      <Container py={2}>
        <Accordion
          ref={accordionRef2}
          header={() => (
            <Typography fontSize={theme.fontSizes.xl} iconProp={{ size: 24 }}>
              Header
            </Typography>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">Accordion using ref</Typography>
          </Container>
        </Accordion>
      </Container>
      <Container py={2}>
        <Accordion
          ref={accordionRef3}
          shouldShowToggle={false}
          header={() => (
            <Container flexDirection="row" justifyContent="space-between">
              <Typography fontSize={theme.fontSizes.xl} iconProp={{ size: 24 }}>
                Header
              </Typography>
              <Touchable
                onPress={() => accordionRef3.current.toggleAccordion()}
              >
                <Typography color="font.darkBlue100">Custom action</Typography>
              </Touchable>
            </Container>
          )}
        >
          <Container bg="background.grey100" borderRadius={8} my={2} p={3}>
            <Typography color="font.primary">
              Accordion with custom toggle action item.
            </Typography>
          </Container>
        </Accordion>
      </Container>
    </Container>
  );
};
