﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Natural selection</title>
</head>
<body>
    <div class="wrapper">
        <h1>
            Natural selection simulation:</h1>
            <h2>Learning to avoid a predator</h2>
        <canvas id="canvas" width="500" height="500"></canvas>
        <form id="form1" runat="server">
        <div>
            <h2>
                Click the box to add survivors</h2>
            <h2>
                Number =
                <div class="counter">
                    0</div>
            </h2>
        </div>
        <h2>Gaussian acceleration coefficients</h2>
        <table>
            <thead>
                <tr>
                    <th>central a</th>
                    <th>central b</th>
                    <th>central c</th>
                    <th>central d</th>
                    <th>radial a</th>
                    <th>radial b</th>
                    <th>radial c</th>
                    <th>radial d</th>
                    <th>Age</th>
                    <th>Sex</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>

            <h2>Settings</h2>
            <h3>femaleTimeBetweenMatings: <span class="time-between-matings"></span></h3>
            <h3>maxAmount: <span class="max-amount"></span></h3>
            <h3>wallElasticity: <span class="wall-elasticity"></span></h3>
        </form>
    </div>

    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5.1.min.js"></script>
<%--
    <script src="http://knockoutjs.com/downloads/knockout-3.0.0.debug.js"></script>
--%>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.10/jquery-ui.min.js"></script>
    <script src="NatSel%20scripts/Settings.js"></script>
    <script src="NatSel%20scripts/Classes.js"></script>
    <script src="NatSel%20scripts/ClassFunctions.js"></script>
    <script src="NatSel%20scripts/Canvas.js"></script>
    <link href="Standard.css" rel="stylesheet" type="text/css" />
</body>
</html>
