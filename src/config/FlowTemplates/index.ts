import as0 from './0';
import buildFlowTemplate1 from '@/src/config/FlowTemplates/1';
import buildFlowTemplate2 from '@/src/config/FlowTemplates/2';
import buildFlowTemplate3 from '@/src/config/FlowTemplates/3';
import buildFlowTemplate4 from '@/src/config/FlowTemplates/4';
import buildFlowTemplate5a from '@/src/config/FlowTemplates/5a';
import buildFlowTemplate6 from '@/src/config/FlowTemplates/6';
import buildFlowTemplate6a from '@/src/config/FlowTemplates/6a';
import buildFlowTemplate7a from '@/src/config/FlowTemplates/7a';
import buildFlowTemplate7b from '@/src/config/FlowTemplates/7b';
import buildFlowTemplate7c from '@/src/config/FlowTemplates/7c';
import buildFlowTemplate7d from '@/src/config/FlowTemplates/7d';
import buildFlowTemplateGeneralizedHoudini from '@/src/config/FlowTemplates/generalizedHoudini';
import buildFlowTemplateGeneralizedOrbiter from '@/src/config/FlowTemplates/generalizedOrbiter';

export function BuildFlowTemplatesMenu() {
  return [
    { ...as0 },
    {
      ...buildFlowTemplate1(),
    },
    { ...buildFlowTemplate2 },
    { ...buildFlowTemplate3() },
    { ...buildFlowTemplate4() },
    { ...buildFlowTemplate5a() },
    { ...buildFlowTemplate6() },
    { ...buildFlowTemplate6a() },
    { ...buildFlowTemplate7a() },
    { ...buildFlowTemplate7b() },
    { ...buildFlowTemplate7c() },
    { ...buildFlowTemplate7d() },
    { ...buildFlowTemplateGeneralizedHoudini() },
    { ...buildFlowTemplateGeneralizedOrbiter() },
  ];
}
