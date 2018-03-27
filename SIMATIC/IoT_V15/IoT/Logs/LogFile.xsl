<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="html"/>

  <!-- global values from root element attributes (LogFile): -->
  <xsl:variable name="DateText" select="/LogFile/@dateText"/>
  <xsl:variable name="DateTime" select="/LogFile/@dateTime"/>
  <xsl:variable name="TypeColHeader" select="/LogFile/@typeText"/>
  <xsl:variable name="MessageColHeader" select="/LogFile/@messageText"/>
  <xsl:variable name="HelpIdColHeader" select="/LogFile/@helpIdText"/>
  <xsl:variable name="TimeColHeader" select="/LogFile/@timeText"/>
  <xsl:variable name="ProjectName" select="/LogFile/@projectName"/>

  <!-- /global values from root element attributes -->
  <xsl:variable name="SupportedMessageTypes">|Action|CriticalError|CriticalDecision|CriticalErrorDecision|Decision|Error|ErrorDecision|Information|Input|Success|Warning|</xsl:variable>
  <xsl:variable name="IconFileExtension">jpg</xsl:variable>
  <xsl:variable name="Action">ICO_PE_InfoActionRequest.ico</xsl:variable>
  <xsl:variable name="CriticalError">ICO_PE_InfoErrorCritical.ico</xsl:variable>
  <xsl:variable name="CriticalDecision">ICO_PE_InfoDecisionCritical.ico</xsl:variable>
  <xsl:variable name="CriticalErrorDecision">ICO_PE_InfoErrorCritical.ico</xsl:variable>
  <xsl:variable name="Decision">ICO_PE_InfoDecision.ico</xsl:variable>
  <xsl:variable name="Error">ICO_PE_InfoError.ico</xsl:variable>
  <xsl:variable name="ErrorDecision">ICO_PE_InfoError.ico</xsl:variable>
  <xsl:variable name="Information">ICO_PE_InfoInformation.ico</xsl:variable>
  <xsl:variable name="Input">ICO_PE_InfoInputRequired.ico</xsl:variable>
  <xsl:variable name="Success">ICO_PE_InfoSuccess.ico</xsl:variable>
  <xsl:variable name="Warning">ICO_PE_InfoWarning.ico</xsl:variable>

  <!-- stylesheet -->
  <xsl:template match="/LogFile">
    <html>
      <head>
        <title>Migration log file</title>
        <style type="text/css">
          Body    { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:12pt; font-weight: bold; color: #000000; line-height:23px; }
          .TitleText    { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:15pt; font-weight: bold; color: #59717d; line-height:23px; }
          .Text         { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt; font-weight: bold; color: black;   line-height:26px; }
          .TableHeader  { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #8ca3b0; border-width: 0px 1px 1px 0px; background-color:#b6c5cf; }
          table.HeaderTable1 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px;  background-color:#d4dbde; }
          table.HeaderTable2 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#e7ebed; }
          table.HeaderTable3 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#ebece4; }
          table.HeaderTable4 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#eef3e2; }
          table.HeaderTable5 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#f1edc2; }
          table.HeaderTable6 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#feffef; }
          table.HeaderTable7 td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: bold;   height: 15pt; text-indent: 0pt; border-style: solid; border-color: #bfbfbf; border-width: 0px 1px 1px 0px; background-color:#fef0c9; }
          table.LeafTable {border-left: 1px solid #bfbfbf;}
          table.LeafTable td { font-family:'Siemens TIA Portal Basic, Tahoma'; font-size:10pt;  font-weight: normal; height: 15pt; border-style: solid; border-color: #bfbfbf; border-width: 0 1px 1px 0px; }

          div.PMContainer { display:inline;
          padding-right:10px;
          }
          span.PlusMinus { display:inline;
          cursor:hand;
          vertical-align:middle;
          padding: 0px 1px 0px 0px;
          border-style:solid;border-width:1px;
          font-family:Lucida Console;font-size:8pt }

          div.Button { font-family: Tahoma; font-size: 9pt; color: #202080; background-color: #EEEEEE; border: 1px solid #8ca3b0; padding: 5px 5px 5px 5px; cursor:hand;}
          td.C1 {width: 32px;}
          td.C2 {width: *}
          td.C3 {width: 90px}
          .IconSubTitle{font-size:8pt; display:block; color:#80A0A8}
          img#busyIcon { width: 25px; height: 25px;}
        </style>
        <script type="text/javascript" src="miglog.simjs.js" ></script>
        <script type="text/javascript" src="miglog.tabletreeview.js" ></script>

        <script type="text/javascript" language="javascript">

          var newDocument;
          var filterTable;

          function body_onload()
          {
          simJs_initialize();


          var root = document.getElementById("logEntryRoot");
          newDocument = new SimJs_ItemCollection();
          newDocument.convertPushAll(root.all);

          var filterTableRoot = document.getElementById("filterForm");
          filterTable = new SimJs_ItemCollection();
          filterTable.convertPushAll(filterTableRoot.all);

          tabletreeview();
          setupFiltering();

          find("#expandAllButton").click(function(){expandAll()});
          find("#collapseAllButton").click(function(){collapseAll()});

          find(".Button").hover(function(){
          this.style.backgroundColor='#d4dbde'},
          function(){
          this.style.backgroundColor='#EEEEEE'});

          find("#controlTable").show();
          find("#busyIcon").hide();

          return false;
          }

        </script>
      </head>
      <body onload="body_onload();">
        <p class="TitleText">
          <xsl:value-of select="$ProjectName"/>
        </p>
        <span class="Text">
          <xsl:value-of select="$DateText"/>
          &#160;
          <xsl:value-of select="$DateTime"/>
        </span>
        <div>
          <table id="controlTable" style="display:none; width:100%;">
            <tr>
              <td   align="center" width="100">
                <div class="Button" id="expandAllButton">Expand All</div>
              </td>
              <td  align="center" STYLE="cursor: hand"  width="100" >
                <div class="Button" id="collapseAllButton">Collapse All</div>
              </td>
              <td align="right">
                <xsl:call-template name="selectionDropdown">
                </xsl:call-template>
              </td>
              <td align="right" width="90px">
                <img id="busyIcon" alt="busy..." src="ICO_PE_ProgressInfiniteTransparent.gif" />
              </td>
            </tr>
          </table>
        </div>
        <div id="resultTree" style="width:100%">
          <table cellspacing="0" cellpadding="3" style="border-left: 1px solid #bfbfbf; width:100%;">
            <tr class="TableHeader">
              <td class="TableHeader C1" align="left" style=" text-indent: 0;">
                <xsl:value-of select="$TypeColHeader"/>
              </td>
              <td class="TableHeader C2" align="left">
                <xsl:value-of select="$MessageColHeader"/>
              </td>
              <td class="TableHeader C3" align="left">
                <xsl:value-of select="$TimeColHeader"/>
              </td>
            </tr>
          </table>
          <div id="logEntryRoot">
            <xsl:apply-templates select="LogEntry"/>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- rendering recursive divs (a div can contain multiple items of headers and sub-divs) -->
  <xsl:template name="LogEntry" match="LogFile/LogEntry">
    <xsl:param name="Level" select="1"/>
    <xsl:param name="errorType" select="Success"/>
    <xsl:variable name="childBlockId" select="generate-id(.)"/>
    <xsl:variable name="displayByDefault">
      <xsl:value-of select="'block'"/>
    </xsl:variable>
    <xsl:choose>
      <!-- when element has a child element named 'LogEntry' -->
      <xsl:when test="LogEntry">
        <!-- call branch template on entry -->
        <xsl:call-template name="LogEntryBranch">
          <xsl:with-param name="Level" select="$Level"/>
          <xsl:with-param name="childBlockId" select="$childBlockId"/>
          <xsl:with-param name="errorType" select="@type"/>
          <xsl:with-param name="displayByDefault" select="$displayByDefault"/>
        </xsl:call-template>
        <!-- recurse on children -->
        <div id="{$childBlockId}" style="display:{$displayByDefault}"
			data-collapsible="true" data-treeLevel="{$Level}" data-errorType="{@type}">
          <xsl:for-each select="LogEntry">
            <xsl:call-template name="LogEntry">
              <xsl:with-param name="Level" select="$Level+1"/>
              <xsl:with-param name="errorType" select="@type"/>
            </xsl:call-template>
          </xsl:for-each>
        </div>
      </xsl:when>
      <xsl:otherwise>
        <!-- entry has no children, apply leaf style -->
        <xsl:call-template name="LogEntryLeaf">
          <xsl:with-param name="Level" select="$Level"/>
          <xsl:with-param name="errorType" select="@type"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- rendering table headers -->
  <xsl:template name="LogEntryBranch">
    <xsl:param name="Level" select="1"/>
    <xsl:param name="childBlockId" select="1"/>
    <xsl:param name="errorType" select="Success"/>
    <xsl:param name="displayByDefault" select="block"/>
    <xsl:variable name="knownNumberOfHeaderStyles" select="7" />
    <xsl:variable name="tableClass">
      <xsl:choose>
        <xsl:when test="$Level &lt; $knownNumberOfHeaderStyles+1">
          <xsl:value-of select="concat('HeaderTable', $Level)" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat('HeaderTable', $knownNumberOfHeaderStyles)" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <table cellspacing="0" cellpadding="3" class="{$tableClass}" style="border-left: 1px solid #bfbfbf; display:{$displayByDefault}; width:100%;" data-errorType="{$errorType}">
      <tr>
        <td class="C1">&#160;</td>
        <td class="C2">
          <xsl:variable name="leftPadding" select="$Level*10"/>
          <div style="padding-left:{$leftPadding};">
            <!--
            <xsl:call-template name="Indentation">
              <xsl:with-param name="IndentLevel" select="$Level" />
            </xsl:call-template>
            -->
            <div class="PMContainer">
              <span class="PlusMinus" ID="{concat('PlusMinus',$childBlockId)}" data-target="{$childBlockId}">-</span>
            </div>
            <xsl:value-of select="Message"/>
            <!-- IE6 doesn't support empty-cells style so insert a non-breaking space where needed-->
            <xsl:if test="normalize-space(Message)=false()">&#160;</xsl:if>
          </div>
        </td>
        <td class="C3" align="right">
          <xsl:value-of select="@dateTime"/>
          <!-- IE6 doesn't support empty-cells style so insert a non-breaking space where needed-->
          <xsl:if test="normalize-space(@dateTime)=false()">&#160;</xsl:if>
        </td>
      </tr>
    </table>
  </xsl:template>

  <!-- rendering leaf nodes (as tables) -->
  <xsl:template name="LogEntryLeaf">
    <xsl:param name="Level" select="1"/>
    <xsl:param name="errorType" select="Success"/>
    <xsl:variable name="displayByDefault">
      <xsl:value-of select="'block'"/>
    </xsl:variable>
    <table class="LeafTable" cellspacing="0" cellpadding="3" style="display:{$displayByDefault}; width:100%;"  data-errorType="{$errorType}">
      <tr>
        <td align="center" class="C1" style="text-indent:0;">
          <xsl:choose>
            <xsl:when test="contains($SupportedMessageTypes, concat('|', @type,'|') )">
              <xsl:element name="img">
                <xsl:attribute name="src">
                  <xsl:choose>
                    <xsl:when test="@type = 'Action'">ICO_PE_InfoActionRequest.ico</xsl:when>
                    <xsl:when test="@type = 'CriticalError'">ICO_PE_InfoErrorCritical.ico</xsl:when>
                    <xsl:when test="@type = 'CriticalDecision'">ICO_PE_InfoDecisionCritical.ico</xsl:when>
                    <xsl:when test="@type = 'CriticalErrorDecision'">ICO_PE_InfoErrorCritical.ico</xsl:when>
                    <xsl:when test="@type = 'Decision'">ICO_PE_InfoDecision.ico</xsl:when>
                    <xsl:when test="@type = 'Error'">ICO_PE_InfoError.ico</xsl:when>
                    <xsl:when test="@type = 'ErrorDecision'">ICO_PE_InfoError.ico</xsl:when>
                    <xsl:when test="@type = 'Information'">ICO_PE_InfoInformation.ico</xsl:when>
                    <xsl:when test="@type = 'Input'">ICO_PE_InfoInputRequired.ico</xsl:when>
                    <xsl:when test="@type = 'Success'">ICO_PE_InfoSuccess.ico</xsl:when>
                    <xsl:when test="@type = 'Warning'">ICO_PE_InfoWarning.ico</xsl:when>
                  </xsl:choose>
                </xsl:attribute>
                <xsl:attribute name="height">16</xsl:attribute>
                <xsl:attribute name="width">16</xsl:attribute>
              </xsl:element>
            </xsl:when>
            <!-- IE6 doesn't support empty-cells style so insert a non-breaking space where needed-->
            <xsl:otherwise>&#160;</xsl:otherwise>
          </xsl:choose>
          <!--<span class="IconSubTitle"><xsl:value-of select="@type"/></span>-->
        </td>
        <td align="left" class="C2">
          <xsl:variable name="leftPadding" select="$Level*10 + 21"/>
          <div style="padding-left:{$leftPadding};">
            <!--
            <xsl:call-template name="Indentation">
              <xsl:with-param name="IndentLevel" select="$Level" />
            </xsl:call-template>
            -->

            <xsl:value-of select="Message"/>
            <!-- IE6 doesn't support empty-cells style so insert a non-breaking space where needed-->
            <xsl:if test="normalize-space(Message)=false()">&#160;</xsl:if>
          </div>
        </td>
        <td align="right" class="C3">
          <xsl:value-of select="@dateTime"/>
          <!-- IE6 doesn't support empty-cells style so insert a non-breaking space where needed-->
          <xsl:if test="normalize-space(@dateTime)=false()">&#160;</xsl:if>
        </td>
      </tr>
    </table>
  </xsl:template>

  <!-- rendering filter form with radioButtons -->
  <xsl:template name="checklist">
    <xsl:param name="selectedFilter" select="1"/>
    <table id="filterForm">
      <tr>
        <td>
          <label>Filter:</label>
        </td>
        <td>
          <input id="AllRadioButton" type="radio" name="errorTypeRadio" />All
        </td>
        <td>
          <input id="WarningRadioButton" type="radio" name="errorTypeRadio" checked="true"/>Warnings and errors
        </td>
        <td>
          <input id="ErrorRadioButton" type="radio" name="errorTypeRadio" />Errors only
        </td>
        <td>
          <input id="InformationRadioButton" type="radio" name="errorTypeRadio" />Information only
        </td>
      </tr>
    </table>
  </xsl:template>

  <!-- rendering filter form with dropdown list -->
  <xsl:template name="selectionDropdown">
    <xsl:param name="selectedFilter" select="'ALL'"/>
    <table id="filterForm">
      <tr>
        <td>
          <label>Filter:</label>
        </td>
        <td>
          <select>
            <option value="ALL">
              <xsl:if test="$selectedFilter = 'ALL'">
                <xsl:attribute name="selected">selected</xsl:attribute>
              </xsl:if>
              <xsl:text>All</xsl:text>
            </option>
            <option value="WARNINGS">
              <xsl:if test="$selectedFilter = 'WARNINGS'">
                <xsl:attribute name="selected">selected</xsl:attribute>
              </xsl:if>
              <xsl:text>Warnings and errors</xsl:text>
            </option>
            <option value="ERRORS">
              <xsl:if test="$selectedFilter = 'ERRORS'">
                <xsl:attribute name="selected">selected</xsl:attribute>
              </xsl:if>
              <xsl:text>Errors only</xsl:text>
            </option>
            <option value="INFOS">
              <xsl:if test="$selectedFilter = 'INFOS'">
                <xsl:attribute name="selected">selected</xsl:attribute>
              </xsl:if>
              <xsl:text>Information only</xsl:text>
            </option>
          </select>
        </td>
      </tr>
    </table>
  </xsl:template>

</xsl:stylesheet>

